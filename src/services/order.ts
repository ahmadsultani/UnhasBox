import { db } from "@/config/firebase";
import { TOrder } from "@/types/order.type";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

export const getAllOrder = async (userId?: string) => {
  const collectionRef = collection(db, "order");

  const queries = [];

  if (userId) queries.push(where("userId", "==", userId));

  const q = query(collectionRef, ...queries);
  const querySnapshot = await getDocs(q);

  const orders: TOrder[] = [];
  querySnapshot.forEach((doc) => {
    const orderData = doc.data();
    const order: TOrder = {
      id: doc.id,
      user: orderData.user,
      products: orderData.products,
      createdAt: orderData.createdAt.toDate(),
      updatedAt: orderData.updatedAt.toDate(),
      userId: orderData.userId,
      totalPrice: orderData.totalPrice,
      totalProduct: orderData.totalProduct,
    };
    orders.push(order);
  });

  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

export const getOrderById = async (orderId: string) => {
  const orderRef = doc(db, "order", orderId);
  const docSnapshot = await getDoc(orderRef);

  if (!docSnapshot.exists()) {
    throw new FirebaseError("order/not-found", "Order not found");
  }

  const orderData = docSnapshot.data();
  const order: TOrder = {
    id: docSnapshot.id,
    user: orderData.user,
    products: orderData.products,
    createdAt: orderData.createdAt.toDate(),
    userId: orderData.userId,
    updatedAt: orderData.updatedAt.toDate(),
    totalPrice: orderData.totalPrice,
    totalProduct: orderData.totalProduct,
  };

  return order;
};

export const checkout = async (
  order: Omit<TOrder, "id" | "createdAt" | "updatedAt">,
) => {
  const orderData: Omit<TOrder, "id" | "createdAt" | "updatedAt"> = {
    user: order.user,
    userId: order.userId,
    products: order.products,
    totalPrice: order.totalPrice,
    totalProduct: order.totalProduct,
  };

  const timestamp = serverTimestamp();

  const response = await runTransaction(db, async (transaction) => {
    for (const product of order.products) {
      const productRef = doc(db, "product", product.product.id);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        throw new Error("Product not found");
      }

      const productData = productSnapshot.data();

      if (productData.stock < product.quantity) {
        throw new Error("Product stock is not enough");
      }

      const cartRef = doc(
        db,
        "cart",
        `${order.user.uid}_${product.product.id}`,
      );
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        transaction.delete(cartRef);
      }

      transaction.update(productRef, {
        stock: productData.stock - product.quantity,
        sold: productData.sold + product.quantity,
      });
    }

    const orderRef = collection(db, "order");
    const response = await addDoc(orderRef, {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    return response;
  });

  return response.id;
};
