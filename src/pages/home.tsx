import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

import { PrimaryButton, OutlinedButton } from "../components/Button";

import MainLayout from "../layouts/MainLayout";

export const Home: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Tombol Kembali diklik");
  };
  return (
    <MainLayout>
      <PrimaryButton onClick={handleButtonClick} fullWidth={false} size="small">
        Button
      </PrimaryButton>
      <OutlinedButton
        onClick={handleButtonClick}
        fullWidth={false}
        size="small"
      >
        Button
      </OutlinedButton>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
    </MainLayout>
  );
};
