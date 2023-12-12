import { useToast } from "@/hooks/useToast";
import { useHistory } from "react-router";
import { TUser } from "@/types/user.type";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface AdminOnly {
  children: React.ReactNode;
}

export const AdminOnly: React.FC<AdminOnly> = ({ children }) => {
  const history = useHistory();
  const { errorToast } = useToast();

  const userCookies = Cookies.get("user");
  const user: TUser = userCookies ? JSON.parse(userCookies) : undefined;

  useEffect(() => {
    if (!user) {
      errorToast("You have to login first");
      history.push("/login/admin");
    }

    if (user?.role !== "admin") {
      errorToast("You're not authorized to access this page");
      history.push("/");
    }
  }, [user, errorToast]);

  return children;
};
