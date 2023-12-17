import { ProductCard } from "@/components/ProductCard";
import { getAllFavoriteProduct } from "@/services/favorite";
import { IonSpinner, IonText } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { EmptyStateFav } from "@/components/Favorite/EmptyStateFav";
import { MainLayout } from "@/layouts";

export const Favorite: React.FC = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getAllFavoriteProduct(),
  });

  return (
    <MainLayout>
      {isLoadingProducts ? (
        <div className="empty-container">
          <IonSpinner
            name="crescent"
            color="primary"
            style={{ marginTop: "-48px", transform: "scale(1.4)" }}
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
        <section className="product">
          <header className="product__header ion-padding">
            <section>
              <IonText color="dark">
                <h1 className="ion-text-center product__title">My Favorite</h1>
              </IonText>
            </section>
          </header>
          <main className="product__container ion-padding">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category.name}
                price={product.price}
                image={product.thumbnail}
                isFavorite={product.isFavorite}
              />
            ))}
          </main>
        </section>
      ) : (
        <EmptyStateFav />
      )}
    </MainLayout>
  );
};
