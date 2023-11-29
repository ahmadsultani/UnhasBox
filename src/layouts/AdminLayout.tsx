import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  bagHandleOutline,
  cartOutline,
  newspaperOutline,
} from "ionicons/icons";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  return (
    <IonSplitPane when="sm" disabled={isMobile ? true : false} contentId="main">
      <IonMenu contentId="main" className="">
        <IonHeader>
          <IonToolbar color="primary">
            <IonItem lines="none" href="/admin" color="primary">
              <IonButtons slot="end">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle className="ion-padding-horizontal">Admin</IonTitle>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem href={`admin/product`}>
              <IonIcon
                aria-hidden="true"
                icon={cartOutline}
                slot="start"
                className="ion-padding-end"
              ></IonIcon>
              <IonLabel>Product</IonLabel>
            </IonItem>
            <IonItem href={`admin/blog`}>
              <IonIcon
                aria-hidden="true"
                icon={newspaperOutline}
                slot="start"
                className="ion-padding-end"
              ></IonIcon>
              <IonLabel>Blog</IonLabel>
            </IonItem>
            <IonItem href={`admin/history-purchase`}>
              <IonIcon
                aria-hidden="true"
                icon={bagHandleOutline}
                slot="start"
                className="ion-padding-end"
              ></IonIcon>
              <IonLabel>History Purchase</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {children}
    </IonSplitPane>
  );
};
