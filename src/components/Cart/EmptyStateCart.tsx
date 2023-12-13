import { IonButton, IonCol, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import "../../styles/cart.css";

export const EmptyStateCart: React.FC = () => {
  return (
    <IonCol className="cart-container ion-padding ion-text-center">
      <IonIcon className="cart__icon" icon={cartOutline}></IonIcon>
      <h4>
        <b>Your Cart is Empty</b>
      </h4>
      <p className="cart__text ion-margin-bottom">
        You haven&apos;t added anything to your cart. We&apos;re sure
        you&apos;ll find something in our store
      </p>
      <IonButton shape="round" className="ion-margin-top" href="/product">
        Shop Now
      </IonButton>
    </IonCol>
  );
};
