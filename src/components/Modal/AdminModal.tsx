import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";

interface AdminModalProps {
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  title,
  isOpen,
  isLoading,
  onClose,
  onSave,
  children,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={true}
      onIonModalDidDismiss={onClose}
      style={{ height: "100%" }}
    >
      <form onSubmit={onSave} noValidate>
        <IonPage>
          <IonHeader className="ion-padding-horizontal">
            <IonToolbar>
              <IonTitle style={{ textTransform: "capitalize" }}>
                {title}
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={onClose}>
                  <IonIcon slot="icon-only" icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <section className="ion-padding" style={{ overflow: "auto" }}>
              {children}
            </section>
          </IonContent>
          <IonFooter>
            <IonText className="buttons ion-padding" slot="end">
              <IonButton
                color="primary"
                fill="solid"
                type="submit"
                disabled={isLoading}
              >
                Save
              </IonButton>
              <IonButton
                color="danger"
                fill="solid"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </IonButton>
            </IonText>
          </IonFooter>
        </IonPage>
      </form>
    </IonModal>
  );
};
