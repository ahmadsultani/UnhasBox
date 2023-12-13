import { IonAlert } from "@ionic/react";

interface DeleteModalProps {
  type: string;
  isOpen: boolean;
  isLoading: boolean;
  description: string;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  type,
  isOpen,
  isLoading,
  description,
  onClose,
  onDelete,
}) => {
  const handleSubmit = () => {
    onDelete();
    onClose();
  };

  return (
    <IonAlert
      isOpen={isOpen || isLoading}
      onDidDismiss={onClose}
      header={`Delete ${type}`}
      message={`Are you sure you want to delete this ${description}?`}
      aria-disabled={isLoading}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: onClose,
        },
        { text: "Delete", handler: () => handleSubmit() },
      ]}
    />
  );
};
