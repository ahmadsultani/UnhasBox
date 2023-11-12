import {
  IonButton,
  IonCard,
  IonImg,
  IonIcon,
  IonItem,
  IonText,
} from "@ionic/react";
import { fakeCartData } from "../../data/fakeCartData";
import "../../styles/cart.css";
import { heart, trash } from "ionicons/icons";
import { parserCurrency } from "@/utils/parsercurrency";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CartCardProps {
  title: string;
  price: number;
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
  const Subtotal = parserCurrency(price * quantity);
  
  const handleRemoveFromCart = () => {
    if (fakeCartData.products.length - 1 === 0) {
      onRemoveFromCart();
    } else {
      onRemoveFromCart();
    }
  };

  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
        <IonCard className="cart__card-product">
          <IonItem className="cart__card-product-item">
            <IonImg
              alt="product"
              src={image}
              className="cart__card-product-image"
            />
            <IonText className="cart__card-product-text">
              <h3><b>{title} </b></h3>
              <p>Price: {parserCurrency(price)}</p>
              <h4><b>Subtotal: {Subtotal}</b></h4>
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
              {isMobile ? (
                <IonIcon slot="icon-only" icon={heart} />
              ) : (
                <IonText>Move to Favorite</IonText>
              )}
              </IonButton>
              <p>|</p>
              <IonButton onClick={handleRemoveFromCart} fill="clear" color="medium">
                <IonIcon icon={trash} onClick={handleRemoveFromCart} />
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
