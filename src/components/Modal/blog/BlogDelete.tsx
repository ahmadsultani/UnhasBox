import { useState } from "react";
import { IonAlert } from "@ionic/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/useToast";

import { deleteOneCategory } from "@/services/category";

import { FirebaseError } from "firebase/app";

interface BlogDeleteProps {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogDelete: React.FC<BlogDeleteProps> = ({
  id,
  name,
  isOpen,
  onClose,
}) => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation<void, FirebaseError, string>({
    mutationFn: deleteOneCategory,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      successToast("Category deleted successfully");
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
      header={`Delete Blog ${name}`}
      message={"Are you sure you want to delete this blog?"}
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
