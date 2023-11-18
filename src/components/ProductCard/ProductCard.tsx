import { IonIcon, IonImg, IonText } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";

import { Link } from "react-router-dom";

import "../../styles/product.css";

import { useState } from "react";
import { parserCurrency } from "@/utils/parsercurrency";


interface ProductCardProps {
  slug: string;
  title: string;
  category: string[];
  price: number;
  image: string;
  desc: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ slug, title, category, price, image, desc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <section className="product__card" onClick={handleOpenClick}>
      <IonImg alt="product" src={image ?? "https://ionicframework.com/docs/img/demos/card-media.png"} className="product__card-img" />
      <IonIcon icon={isFavorite ? heart : heartOutline} color="danger" onClick={handleFavoriteClick} className="product__card-favorite" />
      <a href={`product/${slug}`} className="product__card-text">
        <p className="product__card-text-category">{category.join(" ")}</p>
        <h4 className="product__card-text-title">{title}</h4>
        <h5 className="product__card-text-price">{parserCurrency(price)}</h5>
      </a>
    </section>
  );
};
