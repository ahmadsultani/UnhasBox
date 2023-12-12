import React from "react";
import { IonButton } from "@ionic/react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
  size?: "small" | "default" | "large";
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  fullWidth,
  size,
}) => {
  return (
    <IonButton
      className="ion-text-capitalize"
      onClick={onClick}
      expand={fullWidth ? "full" : undefined}
      size={size}
    >
      {children}
    </IonButton>
  );
};
