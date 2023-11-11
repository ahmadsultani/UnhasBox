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
import { MainLayout } from "../layouts";
import { Hero } from "@/components/Hero";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <IonContent fullscreen className="ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
             <Hero/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                dfsdfs
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </MainLayout>
  );
};
