import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonMenuButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "../../styles/navbar.css";
import { Navitems } from "./Navitems";

export const Navbar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <IonHeader>
      {windowWidth <= 1024 ? (
        <IonToolbar className="ion-padding-horizontal">
          <IonTitle slot="start">
            <IonText color="dark navbar__title">UnhasBox</IonText>
          </IonTitle>
          <IonMenuButton slot="end"></IonMenuButton>
        </IonToolbar>
      ) : (
        <Navitems />
      )}
    </IonHeader>
  );
};
