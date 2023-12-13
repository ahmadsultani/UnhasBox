import {
  IonButton,
  IonIcon,
  IonImg,
  IonText,
  IonChip,
  IonRow,
  IonSpinner,
  useIonRouter,
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
} from "ionicons/icons";

import { useState } from "react";

import { MainLayout } from "@/layouts/MainLayout";
import "@/styles/product-detail.css";
import "@/styles/product.css";

import { ProductCard } from "@/components/ProductCard";

import { getAllProduct, getOneProduct } from "@/services/product";
import { Redirect, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cart";
import { TCartForm } from "@/types/cart.type";
import { useToast } from "@/hooks/useToast";
import { formatPrice } from "@/utils/formatter";
import { addToFavorite, deleteFromFavorite } from "@/services/favorite";
import { ConfirmModal } from "@/components/Modal";
import { checkout } from "@/services/order";
import Cookies from "js-cookie";
import { TUser } from "@/types/user.type";

export const ProductDetail: React.FC = () => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useToast();
  const router = useIonRouter();

  const [quantity, setQuantity] = useState(1);
  const [isOpenModalCheckout, setIsOpenModalCheckout] = useState(false);

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
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id),
  });

  const { mutateAsync: mutateAddToCart } = useMutation({
    mutationKey: ["cart"],
    mutationFn: addToCart,
    onSuccess: () => {
      successToast(`${product?.name} added to cart!`);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      errorToast(`${product?.name} failed add to cart :(`);
    },
  });

  const { mutateAsync: mutateCheckout } = useMutation({
    mutationKey: ["order"],
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      successToast("Thanks for your order!");
      router.push(`/order`, "none");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

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
    return <Redirect to="/404" />;
  }

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["favorite"],
    });

    queryClient.invalidateQueries({
      queryKey: ["product", id],
    });
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      errorToast("You must login first");
      return;
    }

    if (product.isFavorite) {
      await deleteFromFavorite(id);
      invalidateQueries();
      successToast(`${product.name} removed from favorite`);
    } else {
      await addToFavorite(id);
      invalidateQueries();
      successToast(`${product.name} added to favorite`);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      errorToast("You must login first");
      return;
    }

    const data: TCartForm = {
      productId: product!.id,
      quantity,
    };

    await mutateAddToCart(data);
  };

  const handleAddItem = () => {
    if (quantity + 1 > product.stock) {
      errorToast("Stock is not enough!");
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleSetItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!value || value <= 0) {
      errorToast("Quantity must be greater than 0!");
      setQuantity(1);
      return;
    }
    if (value > product.stock) {
      errorToast("Stock is not enough!");
      return;
    }
    setQuantity(value);
  };

  const handleCheckout = async () => {
    if (!user) {
      errorToast("You must login first");
      return;
    }

    if (!product) return;

    await mutateCheckout({
      products: [
        {
          product: product,
          price: product.price,
          quantity: quantity,
        },
      ],
      totalPrice: product.price * quantity,
      userId: user.uid,
      totalProduct: quantity,
      user,
    });
  };

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
                          ? "Stock available"
                          : "Stock not available"}
                      </p>
                    </section>
                    <section className="product-detail__header-info-container">
                      <IonIcon
                        icon={bagHandle}
                        color="dark"
                        className="product-detail__header-info-icon"
                      />
                      <p>{product.sold || 0} Sold</p>
                    </section>
                  </IonRow>
                  <IonText className="product-detail__header-price">
                    {formatPrice(product.price)}
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
                {formatPrice(product.price * quantity)}
              </h3>
            </IonText>
            <section className="product-detail__price-quantity">
              <button
                color="primary"
                className="product-detail__price-quantity-button"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <input
                value={quantity}
                type="number"
                className="product-detail__price-quantity-input"
                onChange={handleSetItem}
              />
              <button
                color="primary"
                className="product-detail__price-quantity-button"
                onClick={handleAddItem}
              >
                +
              </button>
            </section>
            <section className="product-detail__price-button">
              <IonButton
                color="primary"
                className="product-detail__price-button-cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </IonButton>
              <IonButton
                fill="outline"
                color="primary"
                className="product-detail__price-button-buy"
                onClick={() => setIsOpenModalCheckout(true)}
              >
                Buy Now
              </IonButton>
              <IonText
                onClick={handleFavoriteClick}
                className="product-detail__price-favorite"
              >
                <IonIcon
                  icon={product.isFavorite ? heart : heartOutline}
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
          ) : products &&
            products.filter((otherProduct) => otherProduct.id !== product.id)
              .length > 0 ? (
            <main className="product__container">
              <section className="product-section__container">
                {products
                  .filter((otherProduct) => otherProduct.id !== product.id)
                  .slice(0, 4)
                  .map((product) => (
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
              </section>
            </main>
          ) : (
            <div className="empty-container">
              <IonText>
                <p
                  className="ion-text-center"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: 600,
                  }}
                >
                  No products found!
                </p>
              </IonText>
            </div>
          )}
        </footer>
      </section>

      {isOpenModalCheckout && (
        <ConfirmModal
          isOpen={isOpenModalCheckout}
          isLoading={false}
          title="Checkout"
          onClose={() => setIsOpenModalCheckout(false)}
          onSubmit={handleCheckout}
          description={`
            Are you sure want to checkout ${quantity} products with the total of ${
              product.price * quantity
            }?
          `}
        />
      )}
    </MainLayout>
  );
};
