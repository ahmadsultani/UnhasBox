import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <IonContent>
      <Sidebar contentId="main-content" />
      <IonPage id="main-content">
        <Navbar />
        <IonContent fullscreen>{children}</IonContent>
        <Footer />
      </IonPage>
    </IonContent>
  );
};

export default MainLayout;
