import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

import { Footer } from "@/components/Footer";
import { Chat } from "@/components/Chat";

import "../styles/_404.css";

export const _404: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding-horizontal">
          <IonTitle>
            <IonText color="dark" className="ion-padding">
              <p
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                UnhasBox
              </p>
            </IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCol className="not-found">
          <IonText className="not-found__heading">Oops! Page Not Found</IonText>
          <IonText className="not-found__description" color="dark">
            <p>
              We&apos;re sorry, but the page you&apos;re looking for cannot be
              found.
            </p>
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
              <IonText>Go Back</IonText>
            </IonButton>
            <IonButton size="small" shape="round" href="/">
              <IonText className="ion-padding">Go Home</IonText>
            </IonButton>
          </section>
        </IonCol>
        <Chat />
      </IonContent>
      <Footer />
    </IonPage>
  );
};
