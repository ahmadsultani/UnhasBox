import { IonIcon, IonImg, IonItem } from "@ionic/react";
import { heartOutline } from "ionicons/icons";

import { parserCurrency } from "@/utils/parsercurrency";

import "@/styles/product.css";

interface ProductCardProps {
  slug: string;
  title: string;
  category: string;
  price: number;
  image: string;
  desc: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  title,
  category,
  price,
  image,
}) => {
  return (
    <section className="product__card">
      <IonImg alt="product" src={image ?? ""} className="product__card-img" />
      <IonIcon
        icon={heartOutline}
        color="danger"
        className="product__card-favorite"
      />
      <IonItem
        routerLink={`/product/${slug}`}
        lines="none"
        className="ion-no-padding"
      >
        <div className="product__card-text">
          <p className="product__card-text-category">{category || "-"}</p>
          <h4 className="product__card-text-title">{title}</h4>
          <h5 className="product__card-text-price">{parserCurrency(price)}</h5>
        </div>
      </IonItem>
    </section>
  );
};
