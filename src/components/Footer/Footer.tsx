import { IonFooter, IonText, IonTitle, IonToolbar } from "@ionic/react";

export const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar className="ion-padding-horizontal">
        <IonTitle size="small">
          <IonText color="dark">
            &copy; <b>Kelompok 8</b> Sistem Informasi Teknik Informatika 2021
          </IonText>
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};
