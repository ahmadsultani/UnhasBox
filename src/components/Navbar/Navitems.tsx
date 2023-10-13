import {
  IonButton,
  IonButtons,
  IonIcon,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { heart, cart } from "ionicons/icons";
import React from "react";

export const Navitems: React.FC = () => {
  return (
    <IonToolbar>
      <IonButtons className="ion-padding" slot="start">
        <IonTitle className="ion-padding-horizontal" slot="start">
          <IonText color="dark navbar__title">UnhasBox</IonText>
        </IonTitle>
        {navItems.map((item, index) => (
          <IonButton
            key={index}
            href={item.href}
            slot="start"
            color="dark"
            className="ion-padding-horizontal navbar__navitem"
          >
            {item.label}
          </IonButton>
        ))}
      </IonButtons>

      <IonButtons slot="end">
        <IonSearchbar
          placeholder="Search here"
          autoFocus
          className="navbar__searchbar"
        ></IonSearchbar>

        <IonButton color="primary" fill="clear" href="/favorite">
          <IonIcon slot="icon-only" icon={heart} />
        </IonButton>

        <IonButton color="primary" fill="clear" href="/cart">
          <IonIcon slot="icon-only" icon={cart} />
        </IonButton>
      </IonButtons>

      <IonButtons slot="end" className="ion-padding-horizontal ">
        <IonButton href="/login" color="primary" fill="solid" shape="round">
          <IonText className="ion-padding-horizontal navbar__login-text">
            Login
          </IonText>
        </IonButton>
        <IonButton href="/signup" color="primary">
          Signup
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Blog", href: "/blog" },
];
