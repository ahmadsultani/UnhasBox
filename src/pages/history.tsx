import { IonText, IonList, IonItem, IonLabel } from "@ionic/react";
import { MainLayout } from "../layouts";

import "@/styles/history.css";

export const OrderHistory: React.FC = () => {
  return (
    <MainLayout>
      <IonText color="dark">
        <h1 className="ion-text-center cart__title">Order History</h1>
      </IonText>
      <IonList>
        <IonItem className="order-item" lines="none">
          <IonLabel>
            <div className="order-product-info">
              <section className="order-product-overview">
                <img
                  className="order-product-image"
                  src="url-to-your-image"
                  alt="Product Image"
                />
                <div className="order-product-details">
                  <div className="order-product-details-overview">
                    <h3>Testing Product Please Bisa</h3>
                    <p>Food</p>
                  </div>
                  <p>+1 other product(s) </p>
                </div>
              </section>
              <div className="order-product-price">
                <p>IDR 10000 </p>
              </div>
            </div>
            <p className="total-price">Total Price: IDR 10000 </p>
          </IonLabel>
        </IonItem>
      </IonList>
    </MainLayout>
  );
};
