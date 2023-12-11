import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useToast } from "@/hooks/useToast";
import { download, mkConfig, generateCsv } from "export-to-csv";

import { getAllBlog } from "@/services/blog";

import { TBlog } from "@/types/blog.type";

import { AdminLayout } from "@/layouts";
import { BlogDelete } from "@/components/Modal";

import {
  download as downloadIcon,
  pencilSharp,
  trashSharp,
} from "ionicons/icons";

enum EBlogStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

const columns: MRT_ColumnDef<TBlog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    accessorFn: ({ createdAt }) =>
      new Date(createdAt || "").toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    accessorFn: ({ updatedAt }) =>
      new Date(updatedAt || "").toLocaleDateString(),
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "blogs",
});

export const AdminBlog = () => {
  const router = useIonRouter();

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    error,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: getAllBlog,
  });

  const { errorToast } = useToast();

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TBlog>();

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(blogs || []);
    download(csvConfig)(csv);
  };

  const toggleDelete = (blog?: TBlog) => {
    setSelectedRow(blog);
    setIsOpenAlert(!!blog);
  };

  const table = useMaterialReactTable({
    columns,
    data: blogs || [],
    enableEditing: true,
    enableRowActions: true,
    enableRowSelection: false,
    positionActionsColumn: "last",
    muiTablePaperProps: {
      elevation: 0,
    },
    enableFullScreenToggle: false,
    enableStickyFooter: true,
    renderTopToolbarCustomActions: () => (
      <IonButton
        onClick={handleExportData}
        color="primary"
        fill="clear"
        mode="ios"
      >
        <IonIcon icon={downloadIcon} slot="start" className="ion-padding-end" />
        <IonText>Export</IonText>
      </IonButton>
    ),
    renderRowActions: ({ row }) => (
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <IonButton
          color="primary"
          className="ion-padding-vertical"
          onClick={() => router.push(`/admin/blog/edit/${row.original.id}`)}
        >
          <IonIcon icon={pencilSharp} slot="start" />
        </IonButton>
        <IonButton
          color="danger"
          onClick={() => toggleDelete(row.original)}
          className="deleteButton"
        >
          <IonIcon icon={trashSharp} slot="start"></IonIcon>
        </IonButton>
      </div>
    ),
  });

  const renderContent = (status: EBlogStatus) => {
    switch (status) {
      case EBlogStatus.LOADING:
        return (
          <div className="empty-container">
            <IonSpinner
              name="crescent"
              color="primary"
              style={{ transform: "scale(1.5)" }}
            />
          </div>
        );
      case EBlogStatus.ERROR:
        errorToast(error?.name || "Unknown Error");

        return (
          <div className="empty-container">
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </div>
        );
      case EBlogStatus.SUCCESS:
        return (
          <>
            <IonItem lines="none">
              <IonButton
                slot="end"
                color="primary"
                className="ion-padding"
                href="/admin/blog/create"
              >
                <IonIcon icon={pencilSharp} slot="start" />
                <IonText className="ion-padding-horizontal">Create</IonText>
              </IonButton>
            </IonItem>
            <MaterialReactTable table={table} />
            {isOpenAlert && selectedRow && (
              <BlogDelete
                isOpen={isOpenAlert}
                onClose={toggleDelete}
                id={selectedRow.id}
                name={selectedRow.title}
              />
            )}
          </>
        );
    }
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <AdminLayout>
      {!isDesktop && (
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start"></IonMenuButton>
            <IonTitle>Blog</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent className="ion-padding">
        {renderContent(
          isLoadingBlogs
            ? EBlogStatus.LOADING
            : isErrorBlogs
              ? EBlogStatus.ERROR
              : EBlogStatus.SUCCESS,
        )}
      </IonContent>
    </AdminLayout>
  );
};
