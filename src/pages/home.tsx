import { MainLayout } from "../layouts";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { BlogSection } from "@/components/BlogSection/BlogSection";

import "@/styles/home.css";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <section className="ion-text-center home">
        <Hero/>
        <ProductSection/>
        <BlogSection/>
      </section>
    </MainLayout>
  );
};
