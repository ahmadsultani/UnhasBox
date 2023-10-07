import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";

interface NavbarProps {
  title: string;
  hasBackButton?: boolean;
  onBackClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  hasBackButton,
  onBackClick,
}) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {hasBackButton && (
            <IonButton onClick={onBackClick}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          )}
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
