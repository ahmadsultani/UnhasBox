import { IonIcon, IonImg, IonText } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons';

import "../../styles/product.css"

import { useState } from 'react';

interface ProductCardProps{
  title: string;
  category: string[];
  price: string;
  image: string;
  desc: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, category, price, image, desc }) => {

  const [isFavorite, setIsFavorite] = useState(false)
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  };

  return (
    <section className='product__card'>
    <IonImg
      alt="product" 
      src={ image ?? "https://ionicframework.com/docs/img/demos/card-media.png"}
      className="product__card-img"
    />
    <IonIcon
      icon={isFavorite ? heart : heartOutline}
      color='danger'
      onClick={handleFavoriteClick}
      className='product__card-favorite'/>
    <IonText className='product__card-text'>
      <p>{category.join(" ")}</p>
      <h4 className='product__card-text-title'>{title}</h4>
      <h5 className='product__card-text-price'>Rp{price}</h5>
    </IonText>
  </section>
  )
}