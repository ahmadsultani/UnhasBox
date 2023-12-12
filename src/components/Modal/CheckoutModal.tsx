import { IonAlert } from "@ionic/react";

interface ConfirmModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={title}
      message={description}
      aria-disabled={isLoading}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: onClose,
        },
        { text: "Confirm", handler: () => handleSubmit() },
      ]}
    />
  );
};
