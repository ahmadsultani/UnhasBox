import { useState } from "react";
import { IonAlert } from "@ionic/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/useToast";

import { deleteOneProduct } from "@/services/product";

import { FirebaseError } from "firebase/app";

interface ProductDeleteProps {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDelete: React.FC<ProductDeleteProps> = ({
  id,
  name,
  isOpen,
  onClose,
}) => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation<void, FirebaseError, string>({
    mutationFn: deleteOneProduct,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      successToast("Product deleted successfully");
      onClose();
    },
    onError: (error) => {
      errorToast(error.message);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <IonAlert
      isOpen={isOpen || isLoading}
      onDidDismiss={onClose}
      header={`Delete Product ${name}`}
      message={"Are you sure you want to delete this product?"}
      aria-disabled={isLoading}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: onClose,
        },
        { text: "Delete", handler: () => mutateAsync(id) },
      ]}
    />
  );
};
