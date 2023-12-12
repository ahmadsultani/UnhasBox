import { IonButton, IonIcon, IonText } from "@ionic/react";
import React from "react";
import "@/styles/hero.css";
import { arrowForward } from "ionicons/icons";

export const Hero: React.FC = () => {
  return (
    <div className="hero">
      {/* <IonImg
        src="https://i.ytimg.com/vi/uaVVSvP-5yg/maxresdefault.jpg"
        alt="rektorat unhas"
        className="hero__image"
      /> */}
      <section className="hero__text">
        <IonText>
          <h1 className="hero__text-heading">
            The Web Marketplace <br /> for Anak{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "var(--ion-color-primary)",
              }}
            >
              UNHAS
            </span>
          </h1>
        </IonText>
        <IonText color="medium" className="hero__text-p">
          Discover and Enjoy our Delightful yet Amazing Products
        </IonText>
        <div className="hero__button-group">
          <IonButton
            routerLink="/product"
            fill="solid"
            color="primary"
            shape="round"
            mode="ios"
          >
            <IonText className="ion-padding">Explore Product</IonText>
            <IonIcon icon={arrowForward} />
          </IonButton>
          <IonButton
            fill="outline"
            color="primary"
            shape="round"
            mode="ios"
            routerLink="/signup"
          >
            <IonText className="ion-padding">Signup</IonText>
          </IonButton>
        </div>
      </section>
    </div>
  );
};

export default Hero;
