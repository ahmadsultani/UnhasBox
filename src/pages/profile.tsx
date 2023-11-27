import { ChangeEvent, useState } from "react";

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
import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const Profile: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const [selectedFile, setSelectedFile] = useState<string>();

  const handleFileInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedFile(reader.result as string);
    };
  };

  return (
    <MainLayout>
      <main className="profile">
        <IonGrid className="profile__container">
          <IonRow>
            <IonCol size="12" className="ion-text-center profile__header">
              <div className="profile__avatar-input">
                <CustomAvatar
                  src={selectedFile}
                  name={data?.firstName}
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
                  label="Username"
                  labelPlacement="floating"
                ></IonInput>
                <IonInput
                  autocomplete="off"
                  label="Email"
                  labelPlacement="floating"
                ></IonInput>
                <IonInput
                  autocomplete="off"
                  label="Phone Number"
                  labelPlacement="floating"
                ></IonInput>
                <IonButton
                  className="ion-margin-top"
                  fill="solid"
                  slot="end"
                  size="default"
                >
                  Save
                </IonButton>
              </IonList>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="profile__section">
              <IonText>
                <h1 className="profile__section-title">Change Password</h1>
              </IonText>
              <IonList className="ion-padding profile__form-container">
                <IonInput
                  autocomplete="off"
                  label="Old password"
                  labelPlacement="floating"
                ></IonInput>
                <IonInput
                  autocomplete="off"
                  label="New password"
                  labelPlacement="floating"
                ></IonInput>
                <IonInput
                  autocomplete="off"
                  label="Confirm password"
                  labelPlacement="floating"
                ></IonInput>
                <IonButton
                  className="ion-margin-top"
                  fill="solid"
                  slot="end"
                  size="default"
                >
                  Save
                </IonButton>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </main>
    </MainLayout>
  );
};
