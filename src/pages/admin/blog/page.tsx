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

import { blogs } from "@/data/fakeBlogData";
import { AdminModal } from "@/components/AdminModal/AdminModal";
import { trashSharp } from "ionicons/icons";

type Blog = {
  id: number;
  slug: string;
  title: string;
  writer: string;
  tags: string[];
  date: string;
  image: string;
  content: string;
};

export const AdminBlog = () => {
  const columns = useMemo<MRT_ColumnDef<Blog>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "image",
        header: "Image",
        render: (value: string | undefined) => (
          <IonImg
            src={value}
            alt="Blog"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ),
      },

      {
        accessorKey: "slug",
        header: "Slug",
      },
      {
        accessorKey: "tags",
        header: "Tags",
      },

      {
        accessorKey: "content",
        header: "content",
      },
      {
        accessorKey: "writer",
        header: "Writer",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
    ],
    [],
  );

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const table = useMaterialReactTable({
    columns,
    data: blogs,
    enableEditing: true,
    renderRowActions: () => (
      <div className="actions">
        <AdminModal action="" title={"Edit Blog"} field={"blog"} />
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
          <AdminModal action={"Add Blog"} title={"Add Blog"} field="blog" />
          <MaterialReactTable table={table} />
          {isOpenAlert && (
            <IonAlert
              isOpen={isOpenAlert}
              onDidDismiss={handleDeleteCancel}
              header={"Delete Blog"}
              message={"Are you sure you want to delete this blog?"}
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
