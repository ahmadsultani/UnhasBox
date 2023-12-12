import {
  IonButton,
  IonCard,
  IonImg,
  IonIcon,
  IonItem,
  IonText,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { formatPrice } from "@/utils/formatter";

interface CartCardProps {
  title: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveFromCart: () => void;
}

export const CartCard: React.FC<CartCardProps> = ({
  title,
  slug,
  price,
  image,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) => {
  return (
    <IonCard className="cart__card-product">
      <IonItem
        className="cart__card-product-item"
        routerLink={`/product/${slug}`}
      >
        <IonImg
          alt="product"
          src={image}
          className="cart__card-product-image"
        />
        <IonText className="cart__card-product-text">
          <h3>
            <b>{title} </b>
          </h3>
          <p>Price: {formatPrice(price)}</p>
          <h4>
            <b>Subtotal: {formatPrice(price * quantity)}</b>
          </h4>
        </IonText>
      </IonItem>
      <IonItem>
        <footer className="cart__card-product-action">
          <IonButton onClick={onRemoveFromCart} fill="clear" color="medium">
            <IonIcon icon={trash} onClick={onRemoveFromCart} />
          </IonButton>
          <div className="cart__card-quantity">
            <IonButton
              onClick={onDecreaseQuantity}
              shape="round"
              fill="outline"
              className="cart__card-quantity-button"
            >
              -
            </IonButton>
            <span>{quantity}</span>
            <IonButton
              onClick={onIncreaseQuantity}
              shape="round"
              fill="outline"
              className="cart__card-quantity-button"
            >
              +
            </IonButton>
          </div>
        </footer>
      </IonItem>
    </IonCard>
  );
};
