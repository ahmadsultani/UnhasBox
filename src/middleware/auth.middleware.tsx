import { useToast } from "@/hooks/useToast";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import { TUser } from "@/types/user.type";

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { errorToast } = useToast();

  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;

  if (!user) {
    errorToast("You must login first");
    return <Redirect to="/login" />;
  }

  return children;
};
