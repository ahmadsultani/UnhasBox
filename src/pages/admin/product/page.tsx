import { AdminLayout } from "@/layouts";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonImg,
  IonButton,
  IonAlert,
  IonIcon,
} from "@ionic/react";
import { useMemo, useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { products } from "@/data/fakeProductData";
import { AdminModal } from "@/components/AdminModal/AdminModal";
import { trashSharp } from "ionicons/icons";

type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  stock: number;
  price: number;
  image: string;
  desc: string;
};

export const fields = [
  { label: "Product Name", placeholder: "Enter Product Name" },
  { label: "Price", placeholder: "Enter Price" },
  { label: "Category", placeholder: "Enter Category" },
  { label: "Images", placeholder: "Enter Images" },
  { label: "Description", placeholder: "Enter Description" },
  { label: "Stock", placeholder: "Enter Stock" },
];

export const AdminProduct = () => {
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "stock",
        header: "Stock",
      },
      {
        accessorKey: "image",
        header: "Image",
        render: (value: string | undefined) => (
          <IonImg
            src={value}
            alt="Product"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ),
      },
      {
        accessorKey: "desc",
        header: "Description",
      },
    ],
    [],
  );

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const table = useMaterialReactTable({
    columns,
    data: products,
    enableEditing: true,
    renderRowActions: () => (
      <div className="actions">
        <AdminModal action="" title={"Edit Product"} field="product" />
        <IonButton
          color="danger"
          onClick={() => handleDeleteClick()}
          className="deleteButton"
        >
          <IonIcon icon={trashSharp} slot="start"></IonIcon>
        </IonButton>
      </div>
    ),
    enableColumnResizing: true,
  });

  const handleDeleteClick = () => {
    setIsOpenAlert(true);
  };

  const handleDeleteConfirm = () => {
    setIsOpenAlert(false);
  };

  const handleDeleteCancel = () => {
    setIsOpenAlert(false);
  };

  return (
    <AdminLayout>
      <IonPage className="" id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="ion-padding">Product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <AdminModal
            action={"Add Product"}
            title={"Add Product"}
            field="product"
          />
          <MaterialReactTable table={table} />
          {isOpenAlert && (
            <IonAlert
              isOpen={isOpenAlert}
              onDidDismiss={handleDeleteCancel}
              header={"Delete Product"}
              message={"Are you sure you want to delete this product?"}
              buttons={[
                { text: "Cancel", role: "cancel", handler: handleDeleteCancel },
                { text: "Delete", handler: handleDeleteConfirm },
              ]}
            />
          )}
        </IonContent>
      </IonPage>
    </AdminLayout>
  );
};
