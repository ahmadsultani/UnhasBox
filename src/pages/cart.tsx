import React, { useState } from 'react';
import { CartCard } from "../components/Cart/CartCard";
import { MainLayout } from "../layouts";
import { products } from "../data/fakeProductData";
import { EmptyStateCart } from "../components/Cart/EmptyStateCart"; 
import { IonButton, IonText } from '@ionic/react';
import "../styles/cart.css";

export const Cart: React.FC = () => {
  const initialProduct = products[0];
  const [quantity, setQuantity] = useState(1); 
  const [cartEmptyState] = useState(false); 

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (500000 * quantity);

  return (
    <MainLayout>
      {cartEmptyState ? (
        <EmptyStateCart />
      ) : (
            <section className='cart__card'>
            <section>
              <CartCard
                key={initialProduct.id}
                title={initialProduct.title}
                price={initialProduct.price}
                image={initialProduct.image}
                quantity={quantity}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onMoveToFavorites={() => {

                } } onRemoveFromCart={function (): void {
                  throw new Error('Function not implemented.');
                } } />
            </section>
            <section>
              <div className="cart__card-summary">
                <IonText className="cart__card-summary-header">
                  <h2>
                    <b>Summary</b>
                  </h2>
                </IonText>
                <IonText className="cart__card-total-orders">
                  <p>Total Orders</p>
                  <p>
                    <b>Rp {totalPrice}</b>
                  </p>
                </IonText>
                <IonButton expand="full" size="small">
                  Buy
                </IonButton>
              </div>
            </section>
          </section>
        )
      } 
    </MainLayout>
  );
};