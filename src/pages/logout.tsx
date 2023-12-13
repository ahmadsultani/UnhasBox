import { Redirect } from "react-router-dom";

import { useToast } from "@/hooks/useToast";

import Cookies from "js-cookie";

export const Logout: React.FC = () => {
  const { successToast } = useToast();

  Cookies.remove("user");
  successToast("Logout successfully");

  return <Redirect to="/" push />;
};
