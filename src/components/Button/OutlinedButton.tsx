import React from "react";
import { IonButton } from "@ionic/react";

interface OutlinedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
  size?: "small" | "default" | "large";
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  onClick,
  fullWidth,
  size,
}) => {
  return (
    <IonButton
      fill="outline"
      className="ion-text-capitalize"
      onClick={onClick}
      expand={fullWidth ? "full" : undefined}
      size={size}
    >
      {children}
    </IonButton>
  );
};
