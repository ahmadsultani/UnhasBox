import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonText,
} from "@ionic/react";

import "@/styles/admin.css";
import { AdminLayout } from "@/layouts";

export const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <IonPage className="" id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="ion-padding">Dashboard Admin</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText className="">
            <h1 className="ion-text-center">Welcome Admin</h1>
          </IonText>
        </IonContent>
      </IonPage>
    </AdminLayout>
  );
};
