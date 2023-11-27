import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth";

import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import { Redirect } from "react-router";
import { useToast } from "@/hooks/useToast";

export default function CheckAuthMiddleware() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { errorToast } = useToast();

  const user = localStorage.getItem("user");

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return (
      <main className="loading-screen">
        <IonSpinner />
      </main>
    );
  }

  if (isError) {
    if (user) errorToast("Ups! tolong login kembali");
    localStorage.removeItem("user");
  } else {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return <IonRouterOutlet />;
}
