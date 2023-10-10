import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { Navbar } from "../components/Navbar";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <Navbar title="Home" />
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-text-center">
      <IonGrid>
        <IonRow>
          <IonCol>
            <h1 className="ion-margin-bottom">Welcome to Our Website</h1>
            <p className="ion-margin-bottom">Discover amazing products and services.</p>
            <IonButton routerLink="/signup" className="ion-margin" >
              Get Started
            </IonButton>
            <IonButton routerLink="/signup" >
              Get Started
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      
      </IonContent>
    </IonPage>
  );
};
