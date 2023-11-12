import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
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
        </IonGrid>
      </IonContent>
    </MainLayout>
  );
};
