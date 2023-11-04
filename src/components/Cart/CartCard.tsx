import {
  IonButton,
  IonCard,
  IonImg,
  IonIcon,
  IonItem,
  IonText,
} from "@ionic/react";
import "../../styles/cart.css";
import { heart, trash } from "ionicons/icons";

interface CartCardProps {
  title: string;
  price: string;
  image: string;
  onMoveToFavorites: () => void;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveFromCart: () => void;
}

export const CartCard: React.FC<CartCardProps> = ({
  title,
  price,
  image,
  onMoveToFavorites,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) => {
  const totalPrice = (parseFloat(price) * quantity).toFixed(3);

  return (
      <section>
        <IonCard className="cart__card-product">
          <IonItem className="cart__card-product-item">
            <IonImg
              alt="product"
              src={image}
              className="cart__card-product-image"
            />
            <IonText className="cart__card-product-text">
              <h3><b>{title} </b></h3>
              <p>Price: Rp{price}</p>
              <h4><b>Subtotal: Rp{totalPrice}</b></h4>
            </IonText>
          </IonItem>
          <IonItem>
            <footer className="cart__card-product-action">
              <IonButton
                onClick={onMoveToFavorites}
                fill="clear"
                color="medium"
                className="ion-text-capitalize"
              >
                {/* <IonIcon icon={heart} onClick={onMoveToFavorites}/> */}
                Move to Favorite
              </IonButton>
              <p>|</p>
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
      </section>
  );
};
