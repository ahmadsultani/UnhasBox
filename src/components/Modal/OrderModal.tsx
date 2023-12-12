import { TOrder } from "@/types/order.type";
import React from "react";
import { AdminModal } from "./AdminModal";
import { IonImg, IonItem, IonText } from "@ionic/react";
import { formatPrice } from "@/utils/formatter";

interface OrderModalProps {
  order: TOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  return (
    <AdminModal
      title="Order Details"
      isLoading={false}
      isOpen={isOpen}
      onClose={onClose}
      onSave={onClose}
      type="close-only"
    >
      <section style={{ height: "100%" }}>
        {order.products.map((product) => (
          <IonItem
            key={product.product.id}
            className="cart__card-product-item"
            routerLink={`/product/${product.product.id}`}
          >
            <IonImg
              alt="product"
              src={product.product.thumbnail || ""}
              className="cart__card-product-image"
            />
            <IonText className="cart__card-product-text">
              <h3>
                <b>{product.product.name} </b>
              </h3>
              <p>Price: {formatPrice(product.price)}</p>
              <p>Total Product: {product.quantity}</p>
              <h4>
                <b>Subtotal: {formatPrice(product.price * product.quantity)}</b>
              </h4>
            </IonText>
          </IonItem>
        ))}
      </section>
      <section className="cart__card">
        <IonText className="cart__card-total-orders" color="dark">
          <p>
            Total Product: <b>{order.totalProduct}</b>
          </p>
        </IonText>
        <div style={{ height: "100%", width: "1px" }} />
        <IonText className="cart__card-total-orders" color="dark">
          <p style={{ textAlign: "right", width: "100%" }}>
            Summary: <b>{formatPrice(order.totalPrice)}</b>
          </p>
        </IonText>
      </section>
    </AdminModal>
  );
};
