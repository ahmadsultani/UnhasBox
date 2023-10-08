import {
  IonContent,
  IonFooter,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar className="ion-padding-start">
        <IonText>
          Copyright Kelompok 8 Sistem Informasi Teknik Informatika 2023
        </IonText>
      </IonToolbar>
    </IonFooter>
  );
};
