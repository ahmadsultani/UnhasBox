import { IonContent, IonPage } from "@ionic/react";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <IonContent>
      <Sidebar contentId="main-content" />
      <IonPage id="main-content">
        <Navbar />
        <IonContent fullscreen className="ion-padding">{children}</IonContent>
        <Footer />
      </IonPage>
    </IonContent>
  );
};
