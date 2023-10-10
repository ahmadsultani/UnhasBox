import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Navbar } from "../components/Navbar";
import { PrimaryButton, OutlinedButton } from "../components/Button";


export const Home: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Tombol Kembali diklik");
  }
  return (
    <IonPage>
      <Navbar title="Home" />
      <IonContent fullscreen>
        <PrimaryButton onClick={handleButtonClick} fullWidth={false} size="small">Button</PrimaryButton>
        <OutlinedButton onClick={handleButtonClick} fullWidth={false} size="small">Button</OutlinedButton>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};
