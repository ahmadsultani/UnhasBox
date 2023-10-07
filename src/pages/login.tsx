import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import { Navbar } from "../components/Navbar";
import { useState } from "react";
  
  export const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    
    if (username === 'pengguna' && password === 'sandi') {
      
      console.log('Login berhasil');
    } else {
      console.log('Login gagal');
    }
  };

  return (
    <IonPage>
      <Navbar title="Login" />
      <IonContent className="ion-padding">
        <IonInput
          type="text"
          placeholder="Username"
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand="full" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};


  