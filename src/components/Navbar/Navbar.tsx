import {
  IonHeader,
  IonMenuButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "../../styles/navbar.css";
import { Navitems } from "./Navitems";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Navbar: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <IonHeader>
      {!isDesktop ? (
        <IonToolbar>
          <IonTitle slot="start">
            <IonText color="dark" className="ion-padding-start navbar__title">
              UnhasBox
            </IonText>
          </IonTitle>
          <IonMenuButton slot="end"></IonMenuButton>
        </IonToolbar>
      ) : (
        <Navitems />
      )}
    </IonHeader>
  );
};
