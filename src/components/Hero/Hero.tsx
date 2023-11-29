import { IonButton, IonImg, IonText } from "@ionic/react";
import React from "react";
import "@/styles/hero.css";

export const Hero: React.FC = () => {
  return (
    <div className="hero">
      <IonImg
        src="https://i.ytimg.com/vi/uaVVSvP-5yg/maxresdefault.jpg"
        alt="rektorat unhas"
        className="hero__image"
      />
      <section className="hero__text">
        <IonText>
          <h1 className="hero__text-heading">Welcome to Our Website</h1>
          <p className="hero__text-p">Discover Amaizing Products</p>
        </IonText>
        <div className="hero__text-buttons">
          <IonButton
            href="/product"
            fill="solid"
            color="primary"
            className="hero__text-button"
          >
            Explore Product
          </IonButton>
          <IonButton fill="outline" color="light" className="hero__text-button">
            Signup
          </IonButton>
        </div>
      </section>
    </div>
  );
};

export default Hero;
