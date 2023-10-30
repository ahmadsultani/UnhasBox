import { IonButton, IonContent, IonImg, IonInput, IonPage } from "@ionic/react";

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
      <div className="login">
        <section className="login__container">
          <section className="login__container-image">
            <IonImg src="https://stories.freepiklabs.com/api/vectors/tablet-login/pana/render?color=407BFFFF&background=complete&hide=" 
                    className="login__container-image-image"/>
          </section>
          <section className="login__container-text">
            <p className="login__title-1">Hello !</p>
            <p className="login__title-2">Welcome Back</p>
            <header>
              <h1 className="ion-text-center login__title-3">Login</h1>
            </header>
            <main className="login__main">
              <section className="login__inputs">
                <IonInput 
                fill="outline" 
                type="text" 
                label="Email Address" 
                labelPlacement="floating" 
                className="login__inputs-input" 
                onIonChange={(e) => setEmail(e.detail.value!)} />
                <IonInput 
                fill="outline" 
                type="password" 
                label="Password" 
                labelPlacement="floating" 
                className="login__inputs-input" 
                onIonChange={(e) => setPassword(e.detail.value!)} />
              </section>
              <section className="login__forgot">
                <a hrefLang="/forgot-password">Forgot Password?</a>
              </section>
              <IonButton expand="block" className="login__button" onClick={handleLogin}>
                Login
              </IonButton>
              <section className="login__signup">
                <p>
                  Don't have an account? <a hrefLang="/signup">Sign Up</a>
                </p>
              </section>
            </main>
          </section>
        </section>
      </div>
  );
};
