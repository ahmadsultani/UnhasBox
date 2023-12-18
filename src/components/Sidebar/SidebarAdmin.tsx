import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonItem,
  IonTitle,
  IonContent,
  IonList,
  IonIcon,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import {
  cartOutline,
  // newspaperOutline,
  radioOutline,
  bagHandleOutline,
} from "ionicons/icons";

export const SidebarAdmin = ({ id }: { id: string }) => {
  const router = useIonRouter();

  return (
    <IonMenu contentId={id}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonItem
            lines="none"
            routerDirection="back"
            routerOptions={{
              unmount: true,
            }}
            routerLink="/admin"
            color="primary"
          >
            <IonTitle className="ion-padding-horizontal">Admin</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem
            routerDirection="forward"
            routerOptions={{
              unmount: true,
            }}
            routerLink="/admin/product"
          >
            <IonIcon
              aria-hidden="true"
              icon={cartOutline}
              slot="start"
              className="ion-padding-end"
              color={
                router.routeInfo.pathname === "/admin/product"
                  ? "primary"
                  : "dark"
              }
            />
            <IonLabel
              color={
                router.routeInfo.pathname === "/admin/product"
                  ? "primary"
                  : "dark"
              }
            >
              Product
            </IonLabel>
          </IonItem>
          {/* <IonItem
            routerDirection="forward"
            routerOptions={{
              unmount: true,
            }}
            routerLink={`/admin/blog`}
          >
            <IonIcon
              aria-hidden="true"
              icon={newspaperOutline}
              slot="start"
              className="ion-padding-end"
              color={
                router.routeInfo.pathname === "/admin/blog" ? "primary" : "dark"
              }
            />
            <IonLabel
              color={
                router.routeInfo.pathname === "/admin/blog" ? "primary" : "dark"
              }
            >
              Blog
            </IonLabel>
          </IonItem> */}
          <IonItem
            routerDirection="forward"
            routerOptions={{
              unmount: true,
            }}
            routerLink={`/admin/category`}
          >
            <IonIcon
              aria-hidden="true"
              icon={radioOutline}
              slot="start"
              className="ion-padding-end"
              color={
                router.routeInfo.pathname === "/admin/category"
                  ? "primary"
                  : "dark"
              }
            />
            <IonLabel
              color={
                router.routeInfo.pathname === "/admin/category"
                  ? "primary"
                  : "dark"
              }
            >
              Category
            </IonLabel>
          </IonItem>
          <IonItem
            routerDirection="forward"
            routerOptions={{
              unmount: true,
            }}
            routerLink={`/admin/history-purchase`}
          >
            <IonIcon
              aria-hidden="true"
              icon={bagHandleOutline}
              slot="start"
              className="ion-padding-end"
              color={
                router.routeInfo.pathname === "/admin/history-purchase"
                  ? "primary"
                  : "dark"
              }
            />
            <IonLabel
              color={
                router.routeInfo.pathname === "/admin/history-purchase"
                  ? "primary"
                  : "dark"
              }
            >
              History Purchase
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
