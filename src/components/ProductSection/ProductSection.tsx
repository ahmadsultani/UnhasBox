import { ProductCard } from "@/components/ProductCard";

import { products } from "@/data/fakeProductData";

import "@/styles/product-section.css";

export const ProductSection: React.FC = () => {
  const firstFourProducts = products.slice(0, 4);

  return (
    <main className="product-section">
      <h1 className="product-section__title">New Products</h1>
      <main className="product-section__container">
          {firstFourProducts.map((product) => (
            <ProductCard key={product.id} slug={product.slug} title={product.title} category={product.category} price={product.price} image={product.image} desc={product.desc} />
          ))}
        </main>
    </main>
  );
};
