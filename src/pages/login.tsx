import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

import { IonButton, IonImg, IonInput, IonSpinner } from "@ionic/react";

import { signin } from "@/services/auth";

import { TUser } from "@/types/user.type";
import { TSigninForm } from "@/types/form.type";

import "@/styles/login.css";
import { useForm } from "@/hooks/useForm";
import { useToast } from "@/hooks/useToast";

export const Login: React.FC = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation<TUser, Error, TSigninForm>({
    mutationFn: signin,
    retry: 0,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      localStorage.setItem("user", JSON.stringify(data));
      successToast("Logged in successfully");
      setIsLoading(false);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    },
    onError: (error) => {
      errorToast(error.message);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const { values, handleChange, handleSubmit } = useForm<TSigninForm>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => mutateAsync(values),
  });

  return (
    <div className="login">
      <section className="login__container">
        <section className="login__container-image">
          <IonImg
            src="https://stories.freepiklabs.com/api/vectors/tablet-login/pana/render?color=407BFFFF&background=complete&hide="
            className="login__container-image-image"
          />
        </section>
        <section className="login__container-text">
          <p className="login__title-1">Hello !</p>
          <p className="login__title-2">Welcome Back</p>
          <header>
            <h1 className="ion-text-center login__title-3">Login</h1>
          </header>
          <form onSubmit={handleSubmit}>
            <fieldset disabled={isLoading} className="login__main">
              <section className="login__inputs">
                <IonInput
                  fill="outline"
                  type="text"
                  label="Email Address"
                  labelPlacement="floating"
                  name="email"
                  className="login__inputs-input"
                  value={values.email}
                  onIonInput={handleChange}
                  required
                />
                <IonInput
                  fill="outline"
                  type="password"
                  label="Password"
                  name="password"
                  labelPlacement="floating"
                  className="login__inputs-input"
                  value={values.password}
                  onIonInput={handleChange}
                  required
                />
              </section>
              <section className="login__forgot">
                <a href="/forgot-password">Forgot Password?</a>
              </section>
              <IonButton
                expand="block"
                className="login__button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <IonSpinner name="circles" /> : "Login"}
              </IonButton>
              <section className="login__signup">
                <p>
                  Don&apos;t have an account? <a href="/signup">Sign Up</a>
                </p>
              </section>
            </fieldset>
          </form>
        </section>
      </section>
    </div>
  );
};
