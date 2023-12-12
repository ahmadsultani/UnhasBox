import React from "react";
import {
  IonContent,
  IonText,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { AdminLayout } from "@/layouts";
import "@/styles/admin.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Admin: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <AdminLayout>
      {!isDesktop && (
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start"></IonMenuButton>
            <IonTitle>
              <b>Dashboard</b>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent className="ion-padding">
        <section className="admin__hello">
          <IonText className="admin__hello-text">
            <strong>Hello, Admin! Let&apos;s organize UnhasBox</strong>
            <br />
            <strong>and make our customer happy!</strong>
          </IonText>
        </section>
      </IonContent>
    </AdminLayout>
  );
};
