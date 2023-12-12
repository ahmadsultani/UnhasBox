import { useState } from "react";
import {
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
} from "@ionic/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/useToast";

import { createProduct, updateProduct } from "@/services/product";

import { TProductForm, TUpdateProductParams } from "@/types/form.type";

import { AdminModal } from "@/components/Modal";

import { getAllCategory } from "@/services/category";
import { Controller, useForm } from "react-hook-form";
import { TProduct } from "@/types/product.type";
import { FirebaseError } from "firebase/app";
import { useDropzone } from "react-dropzone";
import { cloudUploadOutline } from "ionicons/icons";

interface IProductModalProps {
  action: "create" | "edit";
  product?: TProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<IProductModalProps> = ({
  action,
  product,
  isOpen,
  onClose,
}) => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: mutateCreateProduct } = useMutation<
    void,
    FirebaseError,
    TProductForm
  >({
    mutationKey: ["product"],
    mutationFn: createProduct,
    retry: 0,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.setQueryData(["product"], data);
      successToast("Product created successfully");
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

  const { mutateAsync: mutateUpdateProduct } = useMutation<
    void,
    FirebaseError,
    TUpdateProductParams
  >({
    mutationKey: ["product"],
    mutationFn: updateProduct,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      successToast("Product updated successfully");
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

  const { control, handleSubmit, setValue } = useForm<TProductForm>({
    values: {
      name: product?.name || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      description: product?.description || "",
      category: product?.category.id || "",
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      setValue("thumbnail", file);
    } else {
      errorToast("Please upload only 1 file");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${action} Product`}
      onSave={handleSubmit((data) =>
        action === "create"
          ? mutateCreateProduct(data)
          : mutateUpdateProduct({ id: product?.id || "", product: data }),
      )}
      isLoading={isLoading}
    >
      <fieldset disabled={isLoading}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Please enter product name" }}
          render={({ field: { onChange, value }, fieldState }) => (
            <IonInput
              name="name"
              label="Product Name"
              value={value}
              onIonChange={onChange}
              type="text"
              errorText={fieldState.error?.message}
              color={fieldState.error ? "danger" : "primary"}
              placeholder="Enter Product Name"
              className="ion-margin-bottom"
              labelPlacement="floating"
              fill="outline"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          rules={{
            required: "Please enter the product price",
            min: {
              value: 0,
              message: "Price must be greater than 0",
            },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <IonInput
              name="price"
              value={value}
              onIonChange={onChange}
              placeholder="Enter Product Price"
              type="number"
              label="Product Price"
              min={0}
              errorText={fieldState.error?.message}
              color={fieldState.error ? "danger" : "primary"}
              labelPlacement="floating"
              fill="outline"
              className="ion-margin-bottom"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="stock"
          rules={{
            required: "Please enter product stock",
            min: {
              value: 0,
              message: "Stock must be greater than 0",
            },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <IonInput
              name="price"
              value={value}
              onIonChange={onChange}
              placeholder="Enter Product Stock"
              type="number"
              min={0}
              label="Product Stock"
              errorText={fieldState.error?.message}
              color={fieldState.error ? "danger" : "primary"}
              labelPlacement="floating"
              fill="outline"
              className="ion-margin-bottom"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "Please enter product category" }}
          render={({ field: { onChange, value } }) => (
            <IonSelect
              name="category"
              value={value}
              onIonChange={onChange}
              placeholder="Select Category"
              className="ion-margin-bottom"
              labelPlacement="floating"
              color={isErrorCategories ? "danger" : "primary"}
              label="Product Category"
              fill="outline"
              disabled={isLoadingCategories || isErrorCategories}
              aria-required
            >
              {categories?.map((category, index) => (
                <IonSelectOption
                  key={index}
                  value={category.id}
                  className="ion-margin-bottom ion-text-capitalize"
                >
                  {category.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: "Please enter product rating" }}
          render={({ field: { onChange, value }, fieldState }) => (
            <IonTextarea
              name="description"
              onIonChange={onChange}
              aria-required
              value={value}
              placeholder="Enter Product Description"
              labelPlacement="floating"
              label="Product Description"
              fill="outline"
              errorText={fieldState.error?.message}
              className="ion-margin-bottom"
              rows={5}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="thumbnail"
          render={({ field: { value } }) => (
            <section className="product__image-input">
              <img
                src={
                  value ? URL.createObjectURL(value) : product?.thumbnail || ""
                }
                alt="product"
                className="product__image-preview"
              />
              <div className="product__dropzone" {...getRootProps()}>
                <IonIcon icon={cloudUploadOutline} />
                <IonText color="gray">
                  <IonText color="black">Click to Upload</IonText> or Drop your
                  file here
                </IonText>
                <input {...getInputProps()} />
              </div>
            </section>
          )}
        />
      </fieldset>
    </AdminModal>
  );
};
