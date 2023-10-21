import { IonButton, IonCol, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import "../../styles/cart.css";

export const EmptyStateCart: React.FC = () => {
  return (
      <IonCol className="cart-container ion-padding ion-text-center">
        <IonIcon className="cart__icon" icon={cartOutline}></IonIcon>
        <h4><b>Your Cart is Empty</b></h4>
        <p className="ion-margin-bottom">You haven't added anything to your cart. We're sure you'll find something in our store</p>
        <IonButton shape="round" className="ion-margin-top">Shop Now</IonButton>
      </IonCol>
  );
};
