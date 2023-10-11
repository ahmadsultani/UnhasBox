import {
  IonContent,
} from "@ionic/react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";


export const Home: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Tombol Kembali diklik");
  }
  return (
    <IonContent>
      <Navbar title="Home"/>
      <Hero />
    </IonContent>
  );
};
