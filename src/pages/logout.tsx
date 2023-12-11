import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Redirect } from "react-router-dom";

import { logout } from "@/services/auth";
import { useToast } from "@/hooks/useToast";

import "@/styles/login.css";
import Cookies from "js-cookie";

export const Logout: React.FC = () => {
  const queryClient = useQueryClient();

  const { successToast, errorToast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: logout,
    retry: 0,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      Cookies.remove("user");
      successToast("Logout succeed, see you!");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, []);

  return <Redirect to="/login" />;
};
