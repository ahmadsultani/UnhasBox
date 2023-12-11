import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonSearchbar,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { navItems } from "@/components/Navbar";

import { heart, cart } from "ionicons/icons";

import "@/styles/sidebar.css";
import { CustomAvatar } from "../CustomAvatar";
import { TUser } from "@/types/user.type";
import Cookies from "js-cookie";

interface SidebarProps {
  contentId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ contentId }) => {
  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;

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
            {user && (
              <IonButton shape="round" fill="clear" href="/profile">
                <CustomAvatar src={user.photoURL || ""} name={user.firstName} />
              </IonButton>
            )}
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
              href={!user ? "/login" : "/logout"}
              color="primary"
              expand="full"
              fill="solid"
              shape="round"
            >
              {user ? <IonText>Logout</IonText> : <IonText>Login</IonText>}
            </IonButton>
            {!user && (
              <IonButton
                href="/signup"
                color="primary"
                expand="full"
                fill="clear"
                className="ion-margin-top"
              >
                <IonText>Signup</IonText>
              </IonButton>
            )}
          </section>
        </IonCol>
      </IonContent>
    </IonMenu>
  );
};
