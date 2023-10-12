import {
  IonFooter,
  IonText,
  IonToolbar,
} from "@ionic/react";

export const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar className="ion-padding-start">
        <IonText color="dark">
          &copy; Kelompok 8 Sistem Informasi Teknik Informatika 2023
        </IonText>
      </IonToolbar>
    </IonFooter>
  );
};
