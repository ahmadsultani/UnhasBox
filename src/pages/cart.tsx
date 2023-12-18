import { useState } from "react";

import {
  IonButton,
  IonCard,
  IonSpinner,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import Cookies from "js-cookie";

import { CartCard } from "@/components/Cart/CartCard";
import { EmptyStateCart } from "@/components/Cart/EmptyStateCart";
import { ConfirmModal } from "@/components/Modal";

import { MainLayout } from "@/layouts";

import { getAllCart, updateCartQuantity } from "@/services/cart";
import { checkout } from "@/services/order";

import { useToast } from "@/hooks/useToast";
import { TUser } from "@/types/user.type";
import { TCart } from "@/types/cart.type";

import "@/styles/cart.css";
import { formatPrice } from "@/utils/formatter";

export const Cart: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useIonRouter();

  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  const [isOpenModalCheckout, setIsOpenModalCheckout] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<TCart>();

  const { successToast, errorToast } = useToast();

  const {
    data: cart,
    isLoading: isLoadingCart,
    isError: isErrorCart,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
  });

  const { mutateAsync: mutateCheckout } = useMutation({
    mutationKey: ["order"],
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      successToast("Thanks for your order!");
      router.push(`/order`, "root");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  const { mutateAsync: mutateCartItem } = useMutation<
    void,
    FirebaseError,
    { id: string; type: "increase" | "decrease" | "delete" }
  >({
    mutationFn: ({ id, type }) => updateCartQuantity(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      successToast("Cart updated!");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  const handleIncrease = async (id: string, qty: number, stock: number) => {
    if (qty >= stock) {
      errorToast("Product stock is not enough!");
      return;
    }
    await mutateCartItem({ id, type: "increase" });
  };

  const handleDecrease = async (id: string, quantity: number) => {
    if (quantity <= 1) {
      errorToast("Quantity must be greater than 0!");
      return;
    }
    await mutateCartItem({ id, type: "decrease" });
  };

  const handleDelete = async (id: string) => {
    await mutateCartItem({ id, type: "delete" });
  };

  const handleCheckout = async () => {
    if (!user || !cart) return;

    const orderProducts = cart.cart.map((item) => {
      return {
        product: item.product,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    await mutateCheckout({
      products: orderProducts,
      totalPrice: cart.totalPrice,
      totalProduct: cart.totalSum,
      userId: user.uid,
      user,
    });
  };

  return (
    <MainLayout>
      {isLoadingCart ? (
        <div className="empty-container">
          <IonSpinner
            name="crescent"
            color="primary"
            style={{ marginTop: "-48px", transform: "scale(1.4)" }}
          />
        </div>
      ) : isErrorCart ? (
        <IonText>
          <p
            className="ion-text-center"
            style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}
          >
            Something went wrong!
          </p>
        </IonText>
      ) : cart && cart.cart.length > 0 ? (
        <>
          <section>
            <IonText color="dark">
              <h1 className="ion-text-center cart__title">Your Order</h1>
            </IonText>
          </section>
          <section className="cart__card">
            <section className="cart__card-product-card">
              {cart.cart.map((cart) => (
                <>
                  <CartCard
                    key={cart.id}
                    slug={cart.product.id}
                    title={cart.product.name}
                    price={cart.product.price}
                    image={cart.product.thumbnail}
                    quantity={cart.quantity}
                    onIncreaseQuantity={() =>
                      handleIncrease(cart.id, cart.quantity, cart.product.stock)
                    }
                    onDecreaseQuantity={() =>
                      handleDecrease(cart.id, cart.quantity)
                    }
                    onRemoveFromCart={() => setIsOpenModalDelete(cart)}
                  />
                </>
              ))}
            </section>
            <IonCard className="cart__card-summary">
              <IonText className="cart__card-summary-header" color="dark">
                <h2>
                  <b>Summary</b>
                </h2>
              </IonText>
              <IonText className="cart__card-total-orders" color="dark">
                <p>Total Orders</p>
                <p>
                  <b>{formatPrice(cart.totalPrice)}</b>
                </p>
              </IonText>
              <IonButton
                expand="full"
                size="small"
                onClick={() => setIsOpenModalCheckout(true)}
              >
                Checkout
              </IonButton>
            </IonCard>
            {isOpenModalCheckout && (
              <ConfirmModal
                isOpen={isOpenModalCheckout}
                isLoading={false}
                title="Checkout"
                onClose={() => setIsOpenModalCheckout(false)}
                onSubmit={handleCheckout}
                description={`Are you sure want to checkout ${
                  cart.totalSum
                } products with the total of ${formatPrice(cart.totalPrice)}?`}
              />
            )}
            {isOpenModalDelete && (
              <ConfirmModal
                isOpen={!!isOpenModalDelete}
                isLoading={false}
                onClose={() => setIsOpenModalDelete(undefined)}
                onSubmit={() => handleDelete(isOpenModalDelete.id)}
                title="Delete cart item"
                description={`Are you sure to delete ${isOpenModalDelete.product.name} from cart?`}
              />
            )}
          </section>
        </>
      ) : (
        <EmptyStateCart />
      )}
    </MainLayout>
  );
};
