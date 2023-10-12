import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { heart, cart } from "ionicons/icons";
import React from "react";
import { navItems } from "../Navbar";

import "../../styles/sidebar.css";

interface SidebarProps {
  contentId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ contentId }) => {
  return (
    <IonMenu contentId={contentId} menuId="sidebar">
      <IonHeader>
        <IonToolbar className="ion-padding-horizontal">
          <IonTitle slot="start">
            <IonText color="dark">
              <b>UnhasBox</b>
            </IonText>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" fill="clear" href="/favorite">
              <IonIcon slot="icon-only" icon={heart} />
            </IonButton>

            <IonButton color="primary" fill="clear" href="/cart">
              <IonIcon slot="icon-only" icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-justify-content-between sidebar">
        <IonCol className="sidebar__container">
          <section>
            {navItems.map((item, index) => (
              <IonButton
                key={index}
                href={item.href}
                color="dark"
                fill="clear"
                className=" ion-padding-horizontal sidebar__sidebaritem"
                expand="full"
                slot="start"
              >
                <IonText>
                  <p>{item.label}</p>
                </IonText>
              </IonButton>
            ))}
          </section>

          <section>
            <IonButton
              href="/login"
              color="primary"
              expand="full"
              fill="solid"
              shape="round"
            >
              <IonText>Login</IonText>
            </IonButton>
            <IonButton
              href="/signup"
              color="primary"
              expand="full"
              fill="clear"
              className="ion-margin-top"
            >
              Signup
            </IonButton>
          </section>
        </IonCol>
      </IonContent>
    </IonMenu>
  );
};
