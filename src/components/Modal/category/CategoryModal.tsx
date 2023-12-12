import { useState } from "react";
import { IonInput } from "@ionic/react";

import { FirebaseError } from "firebase/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { AdminModal } from "@/components/Modal";

import { updateCategory, createCategory } from "@/services/category";
import { useToast } from "@/hooks/useToast";

import { TCategoryForm, TUpdateCategoryParams } from "@/types/form.type";
import { TCategory } from "@/types/category.type";

interface ICategoryModalProps {
  action: "create" | "edit";
  category?: TCategory;
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryModal: React.FC<ICategoryModalProps> = ({
  action,
  category,
  isOpen,
  onClose,
}) => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: mutateCreateCategory } = useMutation<
    void,
    FirebaseError,
    TCategoryForm
  >({
    mutationKey: ["category"],
    mutationFn: createCategory,
    retry: 0,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.setQueryData(["category"], data);
      successToast("Category created successfully");
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

  const { mutateAsync: mutateUpdateCategory } = useMutation<
    void,
    FirebaseError,
    TUpdateCategoryParams
  >({
    mutationKey: ["category"],
    mutationFn: updateCategory,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      successToast("Category updated successfully");
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

  const { control, handleSubmit } = useForm<TCategoryForm>({
    values: {
      name: category?.name || "",
    },
  });

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${action} Category`}
      onSave={handleSubmit((data) =>
        action === "create"
          ? mutateCreateCategory(data)
          : mutateUpdateCategory({ id: category?.id || "", category: data }),
      )}
      isLoading={isLoading}
    >
      <fieldset disabled={isLoading}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Please enter category name" }}
          render={({ field: { onChange, value }, fieldState }) => (
            <IonInput
              name="name"
              label="Category Name"
              labelPlacement="floating"
              fill="outline"
              value={value}
              onIonChange={onChange}
              type="text"
              errorText={fieldState.error?.message}
              color={fieldState.error ? "danger" : "primary"}
              placeholder="Enter Category Name"
              className="ion-margin-bottom"
              required
            />
          )}
        />
      </fieldset>
    </AdminModal>
  );
};
