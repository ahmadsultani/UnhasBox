import { IonButton } from "@ionic/react";

import { ProductCard } from "@/components/ProductCard";

import { products } from "@/data/fakeProductData";

import "@/styles/product-section.css";

export const ProductSection: React.FC = () => {
  const firstFourProducts = products.slice(0, 4);
  return (
    <main className="product-section">
      <h1 className="product-section__title">Top Picks</h1>
      <section className="product-section__container">
          {firstFourProducts.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              title={product.title}
              category={product.category}
              price={product.price}
              image={product.image}
              desc={product.desc}
              />
          ))}
      </section>
      <section>
        <IonButton href="/blog" fill="solid" color='primary' className="product-section__button">Explore Product</IonButton>
      </section>
    </main>
  );
};
