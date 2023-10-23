import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";

import { useState } from "react";
import { MainLayout } from "../layouts";

import "../styles/signup.css";

import { lockClosedOutline, lockClosedSharp, personOutline } from "ionicons/icons";

export const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = () => {
    console.log('Signup data:', { firstName, lastName, email, password });
  };

  return (
<MainLayout>
      <div className="signup">
        <section className="signup__container">
          <header>
            <h1 className="ion-text-center signup__title">Create account</h1>
          </header>
          <main className="signup__main">
            <section className="signup__inputs">
              <div className="signup__double">
                <IonInput
                  fill="outline"
                  type="text"
                  label="First Name"
                  labelPlacement="floating"
                  className="signup__inputs-input" 
                  onIonChange={(e) => setFirstName(e.detail.value!)}
                  />
                <IonInput
                  fill="outline"
                  type="text"
                  label="Last Name"
                  labelPlacement="floating"
                  className="signup__inputs-input" 
                  onIonChange={(e) => setLastName(e.detail.value!)}
                  />
              </div>
              <IonInput
                  fill="outline"
                  type="text"
                  label="Email Address"
                  labelPlacement="floating"
                  className="signup__inputs-input" 
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                  <IonInput
                  fill="outline"
                  type="password"
                  label="Password"
                  labelPlacement="floating"
                  className="signup__inputs-input" 
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  />
            </section>
            <IonText className="ion-text-center">
              I've read and agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
            </IonText>
            <IonButton
              expand="full"
              className="signup__button"
              onClick={handleSignup}
              >
              sign up
            </IonButton>
          </main>
        </section>
      </div>
    </MainLayout>
  );
};
