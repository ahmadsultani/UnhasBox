import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonSearchbar,
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
    <IonMenu contentId={contentId} side="end">
      <IonHeader>
        <IonToolbar className="ion-padding-horizontal" slot="start">
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
      <IonContent
        fullscreen
        className="ion-padding ion-justify-content-between sidebar"
      >
        <IonCol className="sidebar__container">
          <IonButtons>
            <IonCol className="sidebar__btn-container">
              <IonSearchbar
                placeholder="Search here"
                autoFocus
                className="sidebar__searchbar"
              />
              {navItems.map((item, index) => (
                <IonButton
                  key={index}
                  href={item.href}
                  color="dark"
                  fill="clear"
                  expand="full"
                >
                  <section className="sidebar__sidebaritem ion-padding-end">
                    <IonIcon slot="start" icon={item.icon} />
                    <IonText>
                      <p style={{ textAlign: "left" }}>{item.label}</p>
                    </IonText>
                  </section>
                </IonButton>
              ))}
            </IonCol>
          </IonButtons>

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
