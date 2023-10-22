import { IonButton, IonCol, IonText } from "@ionic/react";
import { useHistory } from "react-router";

import { MainLayout } from "../layouts";

import "../styles/_404.css";

export const _404: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <IonCol className="not-found">
        <IonText className="not-found__heading">Oops! Page Not Found</IonText>
        <IonText className="not-found__description" color="dark">
          <p>We're sorry, but the page you're looking for cannot be found.</p>
          <p>
            You can go back to the homepage or contact support for assistance.
          </p>
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
