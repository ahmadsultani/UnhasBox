import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import Cookies from "js-cookie";

import { CustomAvatar } from "@/components/CustomAvatar";

import {
  cart,
  cubeOutline,
  heart,
  homeOutline,
  newspaperOutline,
} from "ionicons/icons";

import { TUser } from "@/types/user.type";

export const Navitems: React.FC = () => {
  const router = useIonRouter();
  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;

  return (
    <IonToolbar>
      <IonButtons className="ion-padding" slot="start">
        <IonTitle className="ion-padding-horizontal" slot="start">
          <IonText color="dark" className="navbar__title">
            UnhasBox
          </IonText>
        </IonTitle>
        {navItems.map((item, index) => (
          <IonButton
            key={index}
            href={item.href}
            slot="start"
            color={
              item.href !== "/"
                ? router.routeInfo.pathname.startsWith(item.href)
                  ? "primary"
                  : "dark"
                : router.routeInfo.pathname === item.href
                  ? "primary"
                  : "dark"
            }
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
      {!user ? (
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
        user && (
          <IonItem slot="end" className="ion-padding-horizontal" lines="none">
            <IonText color="dark" className="ion-padding-horizontal">
              Hi, {user.firstName}!
            </IonText>
            <IonButton
              className="ion-no-padding"
              shape="round"
              href="/profile"
              fill="clear"
            >
              <CustomAvatar src={user.photoURL ?? ""} name={user.firstName} />
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
