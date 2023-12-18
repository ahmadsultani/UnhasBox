import { AdminLayout } from "@/layouts";
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
} from "@ionic/react";
import { useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { useQuery } from "@tanstack/react-query";
import {
  download as downloadIcon,
  pencilSharp,
  trashSharp,
} from "ionicons/icons";

import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here

import { CategoryDelete, CategoryModal } from "@/components/Modal";
import { useToast } from "@/hooks/useToast";
import { TCategory } from "@/types/category.type";
import { getAllCategory } from "@/services/category";
import { formatDateAndTime } from "@/utils/formatter";
import { useMediaQuery } from "@/hooks/useMediaQuery";

enum ECategoryStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

const columns: MRT_ColumnDef<TCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    accessorFn: (row) => formatDateAndTime(row.createdAt),
  },
  {
    header: "Updated At",
    accessorFn: (row) => formatDateAndTime(row.updatedAt),
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "categories",
});

export const AdminCategory = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
    refetchOnWindowFocus: false,
  });

  const { errorToast } = useToast();

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<"create" | "edit">();
  const [selectedRow, setSelectedRow] = useState<TCategory>();

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(categories || []);
    download(csvConfig)(csv);
  };

  const toggleDelete = (category?: TCategory) => {
    setSelectedRow(category);
    setIsOpenAlert(!!category);
  };

  const toggleCategoryModal = (open: boolean, category?: TCategory) => {
    if (open) {
      setSelectedRow(category);
      setIsOpenModal(category ? "edit" : "create");
    } else {
      setSelectedRow(undefined);
      setIsOpenModal(undefined);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: categories || [],
    enableEditing: true,
    enableRowActions: true,
    enableRowSelection: false,
    positionActionsColumn: "last",
    muiTablePaperProps: {
      elevation: 0,
    },
    enableFullScreenToggle: false,
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
          onClick={() => toggleCategoryModal(true, row.original)}
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

  const renderContent = (status: ECategoryStatus) => {
    switch (status) {
      case ECategoryStatus.LOADING:
        return (
          <div className="empty-container">
            <IonSpinner
              name="crescent"
              color="primary"
              style={{ transform: "scale(1.5)" }}
            />
          </div>
        );
      case ECategoryStatus.ERROR:
        errorToast(error?.name || "Unknown Error");

        return (
          <div className="empty-container">
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </div>
        );
      case ECategoryStatus.SUCCESS:
        return (
          <>
            <IonItem lines="none">
              <IonButton
                slot="end"
                color="primary"
                className="ion-padding"
                onClick={() => setIsOpenModal("create")}
              >
                <IonIcon icon={pencilSharp} slot="start" />
                <IonText className="ion-padding-horizontal">Create</IonText>
              </IonButton>
            </IonItem>
            <MaterialReactTable table={table} />
            {isOpenModal && (
              <CategoryModal
                action={isOpenModal}
                isOpen={!!isOpenModal}
                category={selectedRow}
                onClose={() => toggleCategoryModal(false)}
              />
            )}
            {isOpenAlert && selectedRow && (
              <CategoryDelete
                isOpen={isOpenAlert}
                onClose={toggleDelete}
                id={selectedRow.id}
                name={selectedRow.name}
              />
            )}
          </>
        );
    }
  };

  return (
    <AdminLayout>
      {!isDesktop && (
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start"></IonMenuButton>
            <IonTitle>
              <b>Category</b>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent className="ion-padding">
        {renderContent(
          isLoadingCategories
            ? ECategoryStatus.LOADING
            : isErrorCategories
              ? ECategoryStatus.ERROR
              : ECategoryStatus.SUCCESS,
        )}
      </IonContent>
    </AdminLayout>
  );
};
