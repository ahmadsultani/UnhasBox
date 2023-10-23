import { IonText, IonChip} from "@ionic/react";

import { MainLayout } from "../layouts";
import { ProductCard }  from "../components/ProductCard";

import { products } from "../data/fakeProductData";

import "../styles/product.css";

export const Product: React.FC = () => {
  return (
    <MainLayout>
      <section className="product">
        <header className="product__header ion-padding">
          <section>
            <IonText color="dark">
              <h1 className="ion-text-center product__title">
                Explore Product
              </h1>  
            </IonText>
            <IonText color="dark">
              <h5 className="ion-text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, doloremque!
              </h5>
            </IonText>
          </section>
          <section className="product__chip-container">
            <IonChip color="primary" className="ion-padding">
              All
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Food
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Drink
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Clothing
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Accessories
            </IonChip>
          </section>
        </header>
        <main className="product__container ion-padding">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              price={product.price}
              image={product.image}
              desc={product.desc}
            />
          ))}
        </main>
      </section>
    </MainLayout>
  );
};
