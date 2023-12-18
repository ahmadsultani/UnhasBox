import { IonIcon, IonImg, IonItem } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";

import { useQueryClient } from "@tanstack/react-query";
import { addToFavorite, deleteFromFavorite } from "@/services/favorite";
import { useToast } from "@/hooks/useToast";
import { formatPrice } from "@/utils/formatter";
import Cookies from "js-cookie";
import { TUser } from "@/types/user.type";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  image,
  isFavorite,
}) => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();

  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["favorite"],
    });

    queryClient.invalidateQueries({
      queryKey: ["product"],
    });
  };

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    if (!user) {
      errorToast("You must login first");
      return;
    }

    if (isFavorite) {
      await deleteFromFavorite(id);
      invalidateQueries();
      successToast(`${name} removed from favorite`);
    } else {
      await addToFavorite(id as string);
      invalidateQueries();
      successToast(`${name} added to favorite`);
    }
  };

  return (
    <section className="product__card">
      <button onClick={handleFavoriteClick}>
        <IonIcon
          icon={isFavorite ? heart : heartOutline}
          color="danger"
          className="product__card-favorite"
        />
      </button>
      <IonImg alt="product" src={image ?? ""} className="product__card-img" />

      <IonItem
        routerLink={`/product/${id}`}
        lines="none"
        className="ion-no-padding"
      >
        <div className="product__card-text">
          <p className="product__card-text-category">{category || "-"}</p>
          <h4 className="product__card-text-name">{name}</h4>
          <h5 className="product__card-text-price">{formatPrice(price)}</h5>
        </div>
      </IonItem>
    </section>
  );
};
