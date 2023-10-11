import { 
    IonContent,
} from '@ionic/react';
import React from 'react';
import { OutlinedButton, PrimaryButton } from "../Button";

export const Hero: React.FC = () => {
    const handleButtonClick = () => {
        console.log("Tombol Kembali diklik");
    }

    return (
        <IonContent className="ion-padding ion-text-center">
            <div>
                <h1>Welcome to Our Website</h1>
                <p>Discover Amaizing Products and Services</p>
            </div>
            <div>
                <PrimaryButton onClick={handleButtonClick} fullWidth={false} size="small">Sign Up</PrimaryButton>
                <OutlinedButton onClick={handleButtonClick} fullWidth={false} size="small">Learn More</OutlinedButton>
            </div>
        </IonContent>
    );
};

export default Hero;