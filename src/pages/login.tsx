import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  IonButton,
  IonIcon,
  IonImg,
  IonInput,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";

import { login } from "@/services/auth";
import { useToast } from "@/hooks/useToast";

import { TUser } from "@/types/user.type";
import { TLoginForm } from "@/types/form.type";

import "@/styles/login.css";
import { eye, eyeOff } from "ionicons/icons";
import { Redirect } from "react-router";

export const Login: React.FC = () => {
  const router = useIonRouter();
  const queryClient = useQueryClient();

  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync } = useMutation<TUser, Error, TLoginForm>({
    mutationFn: login,
    retry: 0,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      Cookies.set("user", JSON.stringify(data));
      successToast("Logged in successfully");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/", "forward");
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

  const { control, handleSubmit } = useForm<TLoginForm>();

  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  if (user) {
    return <Redirect to="/" />;
  }

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
          <div>
            <p className="login__title-1">Hello !</p>
            <p className="login__title-2">Welcome Back</p>
          </div>
          <header>
            <p className="ion-text-center login__title-3">Login</p>
          </header>
          <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
            <fieldset disabled={isLoading} className="login__main">
              <section className="login__inputs">
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Please enter email address",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Please enter valid email address",
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <IonInput
                      fill="outline"
                      type="text"
                      label="Email Address"
                      labelPlacement="floating"
                      name="email"
                      className="login__inputs-input"
                      errorText={fieldState.error?.message}
                      value={value}
                      onIonChange={onChange}
                      required
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <IonInput
                      fill="outline"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      labelPlacement="floating"
                      name="password"
                      className="login__inputs-input"
                      value={value}
                      onIonInput={onChange}
                      errorText={fieldState.error?.message}
                      required
                    >
                      <IonIcon
                        icon={showPassword ? eye : eyeOff}
                        className="login__inputs-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </IonInput>
                  )}
                />
              </section>
              <a href="/forgot-password" className="login__forgot">
                Forgot Password?
              </a>
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
