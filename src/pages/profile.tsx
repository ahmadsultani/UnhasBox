import {
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonList,
  IonGrid,
  IonIcon,
  IonText,
} from "@ionic/react";

import { MainLayout } from "../layouts";

import { add, arrowForward } from "ionicons/icons";

import "@/styles/profile.css";
import { CustomAvatar } from "@/components/CustomAvatar";
import Cookies from "js-cookie";
import { TUser } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { TUpdateProfileForm } from "@/types/form.type";
import { updateUser } from "@/services/user";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

export const Profile: React.FC = () => {
  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;
  const { successToast, errorToast } = useToast();

  const { mutateAsync } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateUser,
    onSuccess: (data) => {
      const newUser = {
        ...user,
        ...data,
      } as TUser;

      Cookies.set("user", JSON.stringify(newUser));
      successToast("Profile updated successfully");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  const { control, handleSubmit, setValue } = useForm<TUpdateProfileForm>({
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<string>();

  const handleFileInputChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    setValue("photoURL", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedFile(reader.result as string);
    };
  };

  return (
    <MainLayout>
      <form
        className="profile"
        onSubmit={handleSubmit((data) => mutateAsync(data))}
      >
        <IonGrid className="profile__container">
          <IonRow>
            <IonCol size="12" className="ion-text-center profile__header">
              <div className="profile__avatar-input">
                <CustomAvatar
                  src={selectedFile || user?.photoURL || ""}
                  name={user?.firstName}
                  size="80px"
                />
                <input
                  accept="image/*"
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleFileInputChange}
                  style={{
                    display: "none",
                  }}
                />
                <label htmlFor="avatar" className="profile__avatar-button">
                  <IonIcon icon={add} />
                </label>
              </div>
              <IonButton fill="clear" href="/logout">
                Logout
                <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="profile__section">
              <IonText>
                <h1 className="profile__section-title">Personal Information</h1>
              </IonText>
              <IonList className="ion-padding profile__form-container">
                <IonInput
                  autocomplete="off"
                  label="Email"
                  labelPlacement="floating"
                  value={user?.email}
                  disabled
                />

                <Controller
                  control={control}
                  name="firstName"
                  rules={{ required: "First name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <IonInput
                      autocomplete="off"
                      label="First Name"
                      labelPlacement="floating"
                      value={value}
                      onIonChange={onChange}
                      required
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: "Last name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <IonInput
                      autocomplete="off"
                      label="Last Name"
                      labelPlacement="floating"
                      value={value}
                      onIonChange={onChange}
                      required
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <IonInput
                      autocomplete="off"
                      label="Phone Number"
                      labelPlacement="floating"
                      value={value}
                      onIonChange={onChange}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="address"
                  render={({ field: { onChange, value } }) => (
                    <IonInput
                      autocomplete="off"
                      label="Address"
                      labelPlacement="floating"
                      value={value}
                      onIonChange={onChange}
                    />
                  )}
                />
              </IonList>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol
              size="12"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IonButton
                className="ion-margin-top"
                fill="solid"
                size="default"
                type="submit"
              >
                <IonText className="ion-padding-horizontal">Save</IonText>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </MainLayout>
  );
};
