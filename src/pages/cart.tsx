import { EmptyStateCart } from "../components/Cart/EmptyStateCart";
import { MainLayout } from "../layouts";

export const Cart: React.FC = () => {
  return (
    <MainLayout>
      <EmptyStateCart/>
    </MainLayout>
  );
};
