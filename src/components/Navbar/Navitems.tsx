import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { CustomAvatar } from "@/components/CustomAvatar";

import {
  heart,
  cart,
  cubeOutline,
  newspaperOutline,
  homeOutline,
} from "ionicons/icons";
import { TUser } from "@/types/user.type";

export const Navitems: React.FC = () => {
  const localUser = localStorage.getItem("user");
  const data = localUser ? (JSON.parse(localUser) as TUser) : null;

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
      {!data ? (
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
      ) : (
        data && (
          <IonItem slot="end" className="ion-padding-horizontal">
            <IonText color="dark" className="ion-padding-horizontal">
              Hi, {data.firstName}!
            </IonText>
            <IonButton
              className="ion-no-padding"
              shape="round"
              href="/profile"
              fill="clear"
            >
              <CustomAvatar src={data.photo_url} name={data.firstName} />
            </IonButton>
          </IonItem>
        )
      )}
    </IonToolbar>
  );
};

export const navItems = [
  { label: "Home", href: "/", icon: homeOutline },
  { label: "Product", href: "/product", icon: cubeOutline },
  { label: "Blog", href: "/blog", icon: newspaperOutline },
];
