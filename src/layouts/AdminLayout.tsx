import { IonPage, IonSplitPane } from "@ionic/react";

import { SidebarAdmin } from "@/components/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <IonSplitPane when="md" contentId="main">
      <SidebarAdmin id="main" />
      <IonPage id="main">{children}</IonPage>
    </IonSplitPane>
  );
};
