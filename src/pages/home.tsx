import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Navbar } from "../components/Navbar";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
    </MainLayout>
  );
};
