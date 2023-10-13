import { IonButton, IonCol, IonText } from "@ionic/react";

import { MainLayout } from "../layouts";

import "../styles/_404.css";

export const _404: React.FC = () => {
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
        <IonButton href="/">Go Home</IonButton>
      </IonCol>
    </MainLayout>
  );
};
