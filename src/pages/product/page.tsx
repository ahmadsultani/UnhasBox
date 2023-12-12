import { IonText, IonChip, IonSpinner, IonSkeletonText } from "@ionic/react";

import { MainLayout } from "@/layouts";
import { ProductCard } from "@/components/ProductCard";

import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/product";

import "@/styles/product.css";
import { getAllCategory } from "@/services/category";

export const Product: React.FC = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
  });

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias, doloremque!
              </h5>
            </IonText>
          </section>
          <section className="product__chip-container">
            {isLoadingCategories ? (
              <>
                <IonChip color="primary" className="ion-padding">
                  <IonSkeletonText animated style={{ width: "48px" }} />
                </IonChip>
                <IonChip color="primary" className="ion-padding">
                  <IonSkeletonText animated style={{ width: "48px" }} />
                </IonChip>
              </>
            ) : isErrorCategories ? (
              <IonText>
                <p className="ion-text-center">Something went wrong!</p>
              </IonText>
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <IonChip
                  key={category.id}
                  color="primary"
                  className="ion-padding"
                  style={{ textTransform: "capitalize" }}
                >
                  {category.name}
                </IonChip>
              ))
            ) : (
              <IonText>
                <p className="ion-text-center">No categories found!</p>
              </IonText>
            )}
          </section>
        </header>

        {isLoadingProducts ? (
          <div className="empty-container">
            <IonSpinner
              name="crescent"
              color="primary"
              style={{ marginTop: "-48px", transform: "scale(1.4)" }}
            />
          </div>
        ) : isErrorProducts ? (
          <IonText>
            <p
              className="ion-text-center"
              style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}
            >
              Something went wrong!
            </p>
          </IonText>
        ) : products && products.length > 0 ? (
          <main className="product__container ion-padding">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.id}
                title={product.name}
                category={product.category.name}
                price={product.price}
                image={product.thumbnail}
                desc={product.description}
              />
            ))}
          </main>
        ) : (
          <IonText>
            <p
              className="ion-text-center"
              style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}
            >
              No products found!
            </p>
          </IonText>
        )}
      </section>
    </MainLayout>
  );
};
