import { AdminLayout } from "@/layouts";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/react";

export const AdminHistoryPurchase = () => {
  return (
    <AdminLayout>
      <IonPage className="" id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="ion-padding">History Purchase</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h1>history</h1>
        </IonContent>
      </IonPage>
    </AdminLayout>
  );
};
