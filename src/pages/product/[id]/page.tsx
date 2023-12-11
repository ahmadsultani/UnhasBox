import {
  IonButton,
  IonIcon,
  IonImg,
  IonText,
  IonChip,
  IonRow,
  IonSpinner,
  IonRedirect,
} from "@ionic/react";
import {
  bagHandle,
  checkmarkCircle,
  closeCircle,
  heart,
  heartOutline,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  star,
} from "ionicons/icons";

import { useState } from "react";

import { MainLayout } from "@/layouts/MainLayout";
import "@/styles/product-detail.css";
import "@/styles/product.css";

import { ProductCard } from "@/components/ProductCard";

import { parserCurrency } from "@/utils/parsercurrency";
import { getAllProduct, getOneProduct } from "@/services/product";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`product/${id}`],
    queryFn: () => getOneProduct(id),
  });

  const [quantity, setQuantity] = useState(1);

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <main className="empty-container">
          <IonSpinner
            name="crescent"
            color="primary"
            style={{ transform: "scale(1.5)" }}
          />
        </main>
      </MainLayout>
    );
  }

  if (isError || !product) {
    return <IonRedirect to="/404" />;
  }

  return (
    <MainLayout>
      <section className="product-detail">
        <main className="product-detail__main">
          <section className="product-detail__container">
            <section className="product-detail__container-image">
              <IonImg
                src={product.thumbnail}
                className="product-detail__image-view-img"
              />
              <IonRow className="product-detail__image-preview">
                <IonImg
                  src={product.thumbnail}
                  className="product-detail__image-preview-item"
                />
                <IonImg
                  src={product.thumbnail}
                  className="product-detail__image-preview-item"
                />
                <IonImg
                  src={product.thumbnail}
                  className="product-detail__image-preview-item"
                />
              </IonRow>
            </section>
            <section className="product-detail__container-content">
              <div className="product-detail__container-divider">
                <header className="product-detail__header">
                  <h1 className="product-detail__header-title">
                    {product.name}
                  </h1>
                  <section className="product-detail__header-chip-container">
                    <IonChip
                      color="primary"
                      className="ion-padding product-detail__header-chip"
                      style={{ textTransform: "capitalize" }}
                    >
                      {product.category.name}
                    </IonChip>
                  </section>
                  <IonRow className="product-detail__header-info">
                    <section className="product-detail__header-info-container">
                      <IonIcon
                        icon={product.stock ? checkmarkCircle : closeCircle}
                        color={product.stock ? "success" : "danger"}
                        className="product-detail__header-info-icon"
                      />
                      <p>
                        {product.stock
                          ? "Stok tersedia"
                          : "Stok tidak tersedia"}
                      </p>
                    </section>
                    <section className="product-detail__header-info-container">
                      <IonIcon
                        icon={bagHandle}
                        color="dark"
                        className="product-detail__header-info-icon"
                      />
                      <p>Terjual {product.sold || 0}</p>
                    </section>
                    <section className="product-detail__header-info-container">
                      <IonIcon
                        icon={star}
                        color="warning"
                        className="product-detail__header-info-icon"
                      />
                      <p>{product.rating || 0} (0 Rating)</p>
                    </section>
                  </IonRow>
                  <IonText className="product-detail__header-price">
                    {parserCurrency(5000000)}
                  </IonText>
                </header>
                <main className="product-detail__content">
                  <h4 className="product-detail__content-detail">Detail</h4>
                  <p className="product-detail__content-description">
                    {product.description}
                  </p>
                </main>
              </div>
              <footer className="product-detail__content-footer">
                <p className="product-detail__content-footer-title">SHARE</p>
                <section className="product-detail__content-footer-icon">
                  <IonIcon
                    icon={logoFacebook}
                    className="product-detail__content-footer-icon-item"
                  />
                  <IonIcon
                    icon={logoInstagram}
                    className="product-detail__content-footer-icon-item"
                  />
                  <IonIcon
                    icon={logoTwitter}
                    className="product-detail__content-footer-icon-item"
                  />
                </section>
              </footer>
            </section>
          </section>
          <div className="product-detail__price">
            <IonText className="product-detail__price-title">
              <p>Subtotal</p>
              <h3 className="product-detail__price-sum">
                {parserCurrency(5000000 * quantity)}
              </h3>
            </IonText>
            <section className="product-detail__price-quantity">
              <button
                color="primary"
                className="product-detail__price-quantity-button"
                onClick={handleMinusClick}
              >
                -
              </button>
              <input
                value={quantity}
                className="product-detail__price-quantity-input"
              />
              <button
                color="primary"
                className="product-detail__price-quantity-button"
                onClick={handlePlusClick}
              >
                +
              </button>
            </section>
            <section className="product-detail__price-button">
              <IonButton
                color="primary"
                className="product-detail__price-button-cart"
              >
                Add to Cart
              </IonButton>
              <IonButton
                fill="outline"
                color="primary"
                className="product-detail__price-button-buy"
              >
                Buy Now
              </IonButton>
              <IonText
                onClick={handleFavoriteClick}
                className="product-detail__price-favorite"
              >
                <IonIcon
                  icon={isFavorite ? heart : heartOutline}
                  color="danger"
                  className="product-detail__price-favorite-icon"
                />
                Favorite
              </IonText>
            </section>
          </div>
        </main>
        <footer className="product-detail__footer">
          <h3 className="product-detail__footer-title">Related Products</h3>
          <main className="product__container">
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
                    image={product.thumbnail}
                    desc={product.description}
                  />
                ))}
              </section>
            ) : (
              <div className="empty-container">
                <IonText>
                  <p
                    className="ion-text-center"
                    style={{
                      marginTop: "3em",
                      fontSize: "1.5em",
                      fontWeight: 600,
                    }}
                  >
                    No products found!
                  </p>
                </IonText>
              </div>
            )}
          </main>
        </footer>
      </section>
    </MainLayout>
  );
};
