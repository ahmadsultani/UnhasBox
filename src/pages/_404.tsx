import { IonButton, IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";

import React from "react";

import "../styles/_404.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const _404: React.FC = () => {
  return (
    <IonPage>
      <Navbar
        title="Not Found Page"
        onBackClick={() => {
          window.history.back();
        }}
        hasBackButton
      />
      <IonContent fullscreen>
        <section className="not-found">
          <h1 className="not-found__heading">Oops! Page Not Found</h1>
          <div className="not-found__description">
            <p className="not-found__paragraph">
              We're sorry, but the page you're looking for cannot be found.
            </p>
            <p className="not-found__paragraph">
              You can go back to the homepage or contact support for assistance.
            </p>
          </div>
          <Link to="/">
            <IonButton>Go Home</IonButton>
          </Link>
        </section>
      </IonContent>
      <Footer />
    </IonPage>
  );
};
