import { Hero } from "../components/Hero";

import { MainLayout } from "../layouts";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
    </MainLayout>
  );
};
