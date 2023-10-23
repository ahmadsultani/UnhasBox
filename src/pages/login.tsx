import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";

import { useState } from "react";

import { MainLayout } from "../layouts";

import "../styles/login.css";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const Login: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (email === "email@gmail.com" && password === "password") {
      console.log("Login berhasil");
    } else {
      console.log("Login gagal");
    }
  };

  return (
    <MainLayout>
      <div className="login">
        <section className="login__container">
          <header>
            <h1 className="ion-text-center login__title">Log in to your account</h1>
          </header>
          <main className="login__main">
            <section className="login__inputs">
              <IonInput fill="outline" type="text" label="Email Address" labelPlacement="floating" className="login__inputs-input" onIonChange={(e) => setEmail(e.detail.value!)} />
              <IonInput fill="outline" type="password" label="Password" labelPlacement="floating" className="login__inputs-input" onIonChange={(e) => setPassword(e.detail.value!)} />
            </section>
            <section className="login__forgot">
              <a href="/forgot-password">Forgot Password?</a>
            </section>
            <IonButton expand="full" className="login__button" onClick={handleLogin}>
              Login
            </IonButton>
            <section className="login__signup">
              <p>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </section>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};
