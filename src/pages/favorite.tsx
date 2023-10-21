import { EmptyStateFav } from "../components/Favorite/EmptyStateFav";
import { MainLayout } from "../layouts";

export const Favorite: React.FC = () => {
  return (
    <MainLayout>
      <EmptyStateFav/>
    </MainLayout>
  );
};
