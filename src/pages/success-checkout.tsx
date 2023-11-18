import { IonButton, IonCol, IonText } from "@ionic/react";
import { useHistory } from "react-router";

import { MainLayout } from "../layouts";

import "../styles/success-checkout.css";

export const SuccessCheckout: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <IonCol className="success-checkout">
        <IonText className="success-checkout__heading">THANK YOU FOR YOUR PURCHASE !</IonText>
        <IonText className="success-checkout__description" color="dark">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, est debitis perferendis libero dicta tempora pariatur sint sit neque minima exercitationem ad qui itaque eveniet beatae quis eius voluptas possimus?</p>
        </IonText>

        <section className="not-found__link-container">
          <IonButton
            shape="round"
            size="small"
            fill="clear"
            onClick={() => history.goBack()}
          >
            <IonText>
              Go Back
            </IonText>
          </IonButton>
          <IonButton size="small" shape="round" href="/">
            <IonText className="ion-padding">
              Go Home
            </IonText>
          </IonButton>
        </section>
      </IonCol>
    </MainLayout>
  );
};
