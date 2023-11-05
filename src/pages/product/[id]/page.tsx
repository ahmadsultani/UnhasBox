import { IonButton, IonIcon, IonImg, IonInput, IonText, IonChip, IonRow, IonCol, IonGrid } from "@ionic/react";
import { bagHandle, checkmarkCircle, heart, heartOutline, logoFacebook, logoInstagram, logoTwitter, star } from "ionicons/icons";

import { useState } from "react";

import { MainLayout } from "@/layouts/MainLayout";
import "@/styles/product-detail.css";
import "@/styles/product.css";

import { ProductCard } from "@/components/ProductCard";

import { products } from "@/data/fakeProductData";

import { parserCurrency } from "@/utils/parsercurrency";

export const ProductDetail: React.FC = () => {
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

  return (
    <MainLayout>
      <section className="product-detail">
        <main className="product-detail__main">
          <section className="product-detail__container">
            <section className="product-detail__container-image">
              <IonImg src="https://cdn.eraspace.com/media/catalog/product/a/p/apple_watch_ultra_49mm_gps_cellular_titanium_case_with_yellow_ocean_band_1_1_1.jpg" className="product-detail__image-view-img" />
              <IonRow className="product-detail__image-preview">
                <IonImg src="https://cdn.eraspace.com/media/catalog/product/a/p/apple_watch_ultra_49mm_gps_cellular_titanium_case_with_yellow_ocean_band_1_1_1.jpg" className="product-detail__image-preview-item" />
                <IonImg src="https://cdn.eraspace.com/media/catalog/product/a/p/apple_watch_ultra_49mm_gps_cellular_titanium_case_with_yellow_ocean_band_1_1_1.jpg" className="product-detail__image-preview-item" />
                <IonImg src="https://cdn.eraspace.com/media/catalog/product/a/p/apple_watch_ultra_49mm_gps_cellular_titanium_case_with_yellow_ocean_band_1_1_1.jpg" className="product-detail__image-preview-item" />
              </IonRow>
            </section>
            <section className="product-detail__container-content">
              <div className="product-detail__container-divider">
                <header className="product-detail__header">
                  <h1 className="product-detail__header-title">Product Name</h1>
                  <section className="product-detail__header-chip-container">
                    <IonChip color="primary" className="ion-padding product-detail__header-chip">
                      category-1
                    </IonChip>
                    <IonChip color="primary" className="ion-padding product-detail__header-chip">
                      category-2
                    </IonChip>
                  </section>
                  <IonRow className="product-detail__header-info">
                    <section className="product-detail__header-info-container">
                      <IonIcon icon={checkmarkCircle} color="success" className="product-detail__header-info-icon" />
                      <p>Stok Tersedia</p>
                    </section>
                    <section className="product-detail__header-info-container">
                      <IonIcon icon={bagHandle} color="dark" className="product-detail__header-info-icon" />
                      <p>Terjual 70+</p>
                    </section>
                    <section className="product-detail__header-info-container">
                      <IonIcon icon={star} color="warning" className="product-detail__header-info-icon" />
                      <p>4.5 (1.250 rating)</p>
                    </section>
                  </IonRow>
                  <IonText className="product-detail__header-price">
                    {parserCurrency(5000000)}
                  </IonText>
                </header>
                <main className="product-detail__content">
                  <h4 className="product-detail__content-detail">Detail</h4>
                  <p className="product-detail__content-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint modi delectus, doloremque ipsa odio repudiandae, nihil fugit cumque illo, hic veniam unde quam. Quos, dicta enim! Minima neque, labore minus deserunt illo
                    molestias iste magni molestiae iure reiciendis quis illum aspernatur officia, numquam laudantium eos cum harum sapiente unde expedita.
                  </p>
                </main>
              </div>
              <footer className="product-detail__content-footer">
                <p className="product-detail__content-footer-title">SHARE</p>
                <section className="product-detail__content-footer-icon">
                  <IonIcon icon={logoFacebook} className="product-detail__content-footer-icon-item" />
                  <IonIcon icon={logoInstagram} className="product-detail__content-footer-icon-item" />
                  <IonIcon icon={logoTwitter} className="product-detail__content-footer-icon-item" />
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
              <button color="primary" className="product-detail__price-quantity-button" onClick={handleMinusClick}>
                -
              </button>
              <input value={quantity} className="product-detail__price-quantity-input" />
              <button color="primary" className="product-detail__price-quantity-button" onClick={handlePlusClick}>
                +
              </button>
            </section>
            <section className="product-detail__price-button">
              <IonButton color="primary" className="product-detail__price-button-cart">
                Add to Cart
              </IonButton>
              <IonButton fill="outline" color="primary" className="product-detail__price-button-buy">
                Buy Now
              </IonButton>
              <IonText onClick={handleFavoriteClick} className="product-detail__price-favorite">
                <IonIcon icon={isFavorite ? heart : heartOutline} color="danger" className="product-detail__price-favorite-icon" />
                Favorite
              </IonText>
            </section>
          </div>
        </main>
        <footer className="product-detail__footer">
          <h3 className="product-detail__footer-title">Related Products</h3>
          <main className="product__container">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} slug={product.slug} title={product.title} category={product.category} price={product.price} image={product.image} desc={product.desc} />
            ))}
          </main>
        </footer>
      </section>
    </MainLayout>
  );
};
