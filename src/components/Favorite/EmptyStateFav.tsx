import { IonCol } from "@ionic/react";
import "../../styles/favorite.css";

export const EmptyStateFav: React.FC = () => {
  return (
    <IonCol className="myFav-container ion-padding ion-text-center">
      <h4>
        <b>My Favorite is Still Empty</b>
      </h4>
      <p className="myFav__text">
        Let&apos;s start adding your dream products here!
      </p>
    </IonCol>
  );
};
