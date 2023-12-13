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

import { useQuery } from "@tanstack/react-query";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";

import { getAllProduct } from "@/services/product";

import { TProduct } from "@/types/product.type";

import { useToast } from "@/hooks/useToast";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { AdminLayout } from "@/layouts";
import { ProductDelete, ProductModal } from "@/components/Modal";

import {
  download as downloadIcon,
  pencilSharp,
  trashSharp,
} from "ionicons/icons";
import { formatDateAndTime } from "@/utils/formatter";

enum EProductStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

const columns: MRT_ColumnDef<TProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "sold",
    header: "Sold",
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
    accessorKey: "createdAt",
    header: "Created At",
    accessorFn: ({ createdAt }) => formatDateAndTime(createdAt),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    accessorFn: ({ updatedAt }) =>
      updatedAt ? formatDateAndTime(updatedAt) : "-",
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "products",
});

export const AdminProduct = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
    refetchOnWindowFocus: false,
  });

  const { errorToast } = useToast();

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<"create" | "edit">();
  const [selectedRow, setSelectedRow] = useState<TProduct>();

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(products || []);
    download(csvConfig)(csv);
  };

  const toggleDelete = (product?: TProduct) => {
    setSelectedRow(product);
    setIsOpenAlert(!!product);
  };

  const toggleProductModal = (open: boolean, product?: TProduct) => {
    if (open) {
      setSelectedRow(product);
      setIsOpenModal(product ? "edit" : "create");
    } else {
      setSelectedRow(undefined);
      setIsOpenModal(undefined);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: products || [],
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
          onClick={() => toggleProductModal(true, row.original)}
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

  const renderContent = (status: EProductStatus) => {
    switch (status) {
      case EProductStatus.LOADING:
        return (
          <div className="empty-container">
            <IonSpinner
              name="crescent"
              color="primary"
              style={{ transform: "scale(1.5)" }}
            />
          </div>
        );
      case EProductStatus.ERROR:
        errorToast(error?.name || "Unknown Error");

        return (
          <div className="empty-container">
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </div>
        );
      case EProductStatus.SUCCESS:
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
              <ProductModal
                action={isOpenModal}
                isOpen={!!isOpenModal}
                product={selectedRow}
                onClose={() => toggleProductModal(false)}
              />
            )}
            {isOpenAlert && selectedRow && (
              <ProductDelete
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

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <AdminLayout>
      {!isDesktop && (
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start"></IonMenuButton>
            <IonTitle>
              <b>Product</b>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent className="ion-padding">
        {renderContent(
          isLoadingProducts
            ? EProductStatus.LOADING
            : isErrorProducts
              ? EProductStatus.ERROR
              : EProductStatus.SUCCESS,
        )}
      </IonContent>
    </AdminLayout>
  );
};
