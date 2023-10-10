import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel
} from "@ionic/react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

export const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

const handleSignup = () => {
  console.log('Signup data:', { firstName, lastName, userName, email, password });
};

return (
  <IonPage>
    <Navbar title="Sign up" />
    <IonContent className="ion-padding ">
      <IonItem className="ion-margin-bottom">
        <IonLabel position="floating">First Name</IonLabel>
        <IonInput
          type="text"
          placeholder="First Name"
          value={firstName}
          onIonChange={(e) => setFirstName(e.detail.value!)}
        />
      </IonItem>
      <IonItem className="ion-margin-bottom">
        <IonLabel position="floating">Last Name</IonLabel>
        <IonInput
          type="text"
          placeholder="Last Name"
          value={lastName}
          onIonChange={(e) => setLastName(e.detail.value!)}
        />
      </IonItem>
      <IonItem className="ion-margin-bottom">
        <IonLabel position="floating">Username</IonLabel>
        <IonInput
          type="text"
          placeholder="Username"
          value={userName}
          onIonChange={(e) => setUserName(e.detail.value!)}
        />
      </IonItem>
      <IonItem className="ion-margin-bottom">
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          placeholder="Email"
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>
      <IonItem className="ion-margin-bottom">
        <IonLabel position="floating">Password</IonLabel>
        <IonInput
        type="password"
        placeholder="Password"
        onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>
      <IonButton expand="full" type="submit" onClick={handleSignup}>Sign up</IonButton>
    </IonContent>
  </IonPage>
);
};