import { IonButton, IonSpinner, IonText } from "@ionic/react";

import { ProductCard } from "@/components/ProductCard";

import "@/styles/product-section.css";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/product";

export const ProductSection: React.FC = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  return (
    <main className="product-section">
      <h1 className="product-section__title">Top Picks</h1>
      {isLoadingProducts ? (
        <div className="empty-container">
          <IonSpinner
            color="primary"
            name="crescent"
            style={{ transform: "scale(1.4)" }}
          />
        </div>
      ) : isErrorProducts ? (
        <div className="empty-container">
          <IonText>
            <p
              className="ion-text-center"
              style={{ fontSize: "1.5em", fontWeight: 600 }}
            >
              Something went wrong!
            </p>
          </IonText>
        </div>
      ) : products && products.length > 0 ? (
        <section className="product-section__container">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              slug={product.id}
              title={product.name}
              category={product.category.name}
              price={product.price}
              image={product.image}
              desc={product.description}
            />
          ))}
        </section>
      ) : (
        <div className="empty-container">
          <IonText>
            <p
              className="ion-text-center"
              style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}
            >
              No products found!
            </p>
          </IonText>
        </div>
      )}
      <section>
        <IonButton
          href="/product"
          fill="solid"
          color="primary"
          className="product-section__button"
        >
          Explore Product
        </IonButton>
      </section>
    </main>
  );
};
