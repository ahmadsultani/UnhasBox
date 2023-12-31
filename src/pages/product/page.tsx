import {
  IonText,
  IonChip,
  IonSpinner,
  IonSkeletonText,
  IonButton,
} from "@ionic/react";

import { MainLayout } from "@/layouts";
import { ProductCard } from "@/components/ProductCard";

import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/product";

import "@/styles/product.css";
import { getAllCategory } from "@/services/category";
import { useMemo } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";

export const Product: React.FC = () => {
  const query = useQueryParams();
  const search = query.get("search");

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

  const filteredProducts = useMemo(() => {
    if (products && search) {
      // search for name or category.name
      return products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return products;
  }, [products, search]);

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
                Find products that suits you the most. You can find anything
                related to Unhas here!
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
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <main className="product__container ion-padding">
            {filteredProducts.map((product) => (
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
        ) : (
          <>
            <IonText>
              <p
                className="ion-text-center"
                style={{ marginTop: "4em", fontSize: "1.4em", fontWeight: 400 }}
              >
                No products found{search && ` with keyword "${search}"`}!
              </p>
            </IonText>
            {search && (
              <IonButton
                fill="outline"
                mode="ios"
                className="ion-text-center"
                routerLink="/product"
                style={{
                  margin: "auto",
                  marginTop: "1em",
                  fontSize: "1em",
                  fontWeight: 500,
                }}
              >
                Reset Search
              </IonButton>
            )}
          </>
        )}
      </section>
    </MainLayout>
  );
};
