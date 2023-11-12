import React, { useState } from 'react';
import { CartCard } from "../components/Cart/CartCard";
import { MainLayout } from "../layouts";
import { fakeCartData } from "../data/fakeCartData";
import { EmptyStateCart } from "../components/Cart/EmptyStateCart"; 
import { IonButton, IonText } from '@ionic/react';
import "../styles/cart.css";
import { parserCurrency } from "@/utils/parsercurrency";

export const Cart: React.FC = () => {
  const product = fakeCartData.products[0];
  const [quantity, setQuantity] = useState(1); 
  const [isCartEmpty, setIsCartEmpty] = useState(fakeCartData.products.length === 0); 

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = parserCurrency(product.price * quantity);

  const onRemoveFromCart = () => {
    setIsCartEmpty(true);
  };

  return (
    <MainLayout>
      {isCartEmpty ? (
        <EmptyStateCart />
      ) : (
            <><section>
            <IonText color="dark">
              <h1 className='ion-text-center cart__title'>Your Order</h1>
            </IonText>
            </section>
            <section className='cart__card'>
              <section className='cart__card-product-card'>
                <CartCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  quantity={quantity}
                  onIncreaseQuantity={increaseQuantity}
                  onDecreaseQuantity={decreaseQuantity}
                  onMoveToFavorites={() => { } }
                  onRemoveFromCart={onRemoveFromCart} />
              </section>
                <div className="cart__card-summary">
                  <IonText className="cart__card-summary-header">
                    <h2>
                      <b>Summary</b>
                    </h2>
                  </IonText>
                  <IonText className="cart__card-total-orders">
                    <p>Total Orders</p>
                    <p>
                      <b>{totalPrice}</b>
                    </p>
                  </IonText>
                  <IonButton expand="full" size="small">
                    Buy
                  </IonButton>
                </div>
            </section></>
        )
      } 
    </MainLayout>
  );
};