import { 
  IonButton,
    IonContent, IonImg, IonText,
} from '@ionic/react';
import React from 'react';
import { OutlinedButton, PrimaryButton } from "../Button";
import "@/styles/hero.css";

export const Hero: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Tombol Kembali diklik");
  }

  return (
    <div className='hero'>
      <IonImg src="https://images.unsplash.com/photo-1563244495-1de93ffe7c23?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="rektorat unhas" className="hero__image" />
      <section className='hero__text'>
        <IonText>
          <h1 className='hero__text-heading'>Welcome to Our Website</h1>
          <p className='hero__text-p'>Discover Amaizing Products and Services</p>
        </IonText>
        <div className='hero__text-buttons'>
          <IonButton fill="solid" color='primary' className="hero__text-button">Explore Product</IonButton>
          <IonButton fill="outline" color='light' className="hero__text-button">Signup</IonButton>
        </div>
      </section>  
    </div>
  );
};

export default Hero;