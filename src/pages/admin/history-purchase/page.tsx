import { AdminLayout } from "@/layouts";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
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
import { bookOutline, download as downloadIcon } from "ionicons/icons";

import { download, generateCsv, mkConfig } from "export-to-csv"; //or use your library of choice here

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useToast } from "@/hooks/useToast";
import { getAllOrder } from "@/services/order";
import { TOrder } from "@/types/order.type";
import { formatDateAndTime } from "@/utils/formatter";
import { OrderModal } from "@/components/Modal/OrderModal";

enum ECategoryStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

const columns: MRT_ColumnDef<TOrder>[] = [
  {
    header: "Purchaser",
    accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
  },
  {
    header: "Purchaser Email",
    accessorKey: "user.email",
  },
  {
    header: "Total Price",
    accessorKey: "totalPrice",
  },
  {
    header: "Total Products",
    accessorKey: "totalProduct",
  },
  {
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
  filename: "orders",
});

export const AdminHistoryPurchase = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const {
    data: orders,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error,
  } = useQuery({
    queryKey: ["order"],
    queryFn: () => getAllOrder(),
    refetchOnWindowFocus: false,
  });

  const { errorToast } = useToast();

  const [isOpenModal, setIsOpenModal] = useState<TOrder>();

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(orders || []);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data: orders || [],
    enableEditing: true,
    enableRowActions: true,
    enableRowSelection: false,
    positionActionsColumn: "last",
    muiTablePaperProps: {
      elevation: 0,
    },
    initialState: {
      sorting: [
        {
          id: "Created At",
          desc: false,
        },
      ],
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
          onClick={() => setIsOpenModal(row.original)}
        >
          <IonIcon icon={bookOutline} slot="start" />
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
            {isOpenModal && (
              <OrderModal
                order={isOpenModal}
                isOpen={!!isOpenModal}
                onClose={() => setIsOpenModal(undefined)}
              />
            )}
            <MaterialReactTable table={table} />
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
              <b>History Purchase</b>
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
