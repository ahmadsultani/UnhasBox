import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonIcon,
  IonText,
} from "@ionic/react";
import { pencilSharp } from "ionicons/icons";

import { useState } from "react";

interface AdminModalProps {
  action: string | null;
  title: string;
  field: "product" | "blog";
  // name: string;
  // categories: string[];
  // price: number;
  // desc: string;
  // image: string;
  // stock: number;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  action,
  title,
  field,
  // name,
  // categories,
  // price,
  // desc,
  // image,
  // stock,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const fields = field === "product" ? fieldsProduct : fieldsBlog;
  return (
    <>
      <IonButton
        color="primary"
        className="ion-padding-vertical"
        onClick={() => setIsOpen(true)}
      >
        <IonIcon icon={pencilSharp} slot="start"></IonIcon>
        {action}
      </IonButton>
      <IonModal isOpen={isOpen} backdropDismiss={false}>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-padding-start">{title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {fields.map((field, index) => (
            <IonInput
              key={index}
              label={field.label}
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder={field.placeholder}
              className="ion-margin-bottom"
            ></IonInput>
          ))}
          <IonText className="buttons">
            <IonButton color="primary" onClick={() => setIsOpen(false)}>
              Save
            </IonButton>
            <IonButton color="danger" onClick={() => setIsOpen(false)}>
              Cancel
            </IonButton>
          </IonText>
        </IonContent>
      </IonModal>
    </>
  );
};

export const fieldsProduct = [
  { label: "Product Name", placeholder: "Enter Product Name" },
  { label: "Price", placeholder: "Enter Price" },
  { label: "Category", placeholder: "Enter Category" },
  { label: "Images", placeholder: "Enter Images" },
  { label: "Description", placeholder: "Enter Description" },
  { label: "Stock", placeholder: "Enter Stock" },
];
export const fieldsBlog = [
  { label: "Title", placeholder: "Enter Title" },
  { label: "Slug", placeholder: "Enter Slug" },
  { label: "Tags", placeholder: "Enter Tags" },
  { label: "Images", placeholder: "Enter Images" },
  { label: "Writer", placeholder: "Enter Writer" },
  { label: "Date", placeholder: "Enter Date" },
  { label: "Content", placeholder: "Enter Content" },
];
