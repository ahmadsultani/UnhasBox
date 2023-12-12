import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IonInput,
  IonButton,
  IonText,
  IonImg,
  IonSpinner,
  IonIcon,
} from "@ionic/react";

import { useHistory } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { signup } from "@/services/auth";

import { TSignupForm } from "@/types/form.type";
import { TUser } from "@/types/user.type";

import "@/styles/signup.css";
import { useToast } from "@/hooks/useToast";
import { eye, eyeOff } from "ionicons/icons";
import Cookies from "js-cookie";

export const Signup: React.FC = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync } = useMutation<TUser, Error, TSignupForm>({
    mutationFn: signup,
    retry: 0,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      Cookies.set("user", JSON.stringify(data));
      successToast("Account created successfully");
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

  const { control, handleSubmit } = useForm<TSignupForm>();

  return (
    <div className="signup">
      <section className="signup__container">
        <section className="signup__container-image">
          <IonImg
            src="https://stories.freepiklabs.com/api/vectors/sign-up/rafiki/render?color=&background=complete&hide="
            className="signup__container-image-image"
          />
        </section>
        <section className="signup__container-text">
          <div className="signup__title-container">
            <p className="signup__title-1">Let&apos;s</p>
            <p className="signup__title-2">Create Account</p>
          </div>
          <p className="ion-text-center signup__title-3">Sign Up</p>
          <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
            <fieldset className="signup__main" disabled={isLoading}>
              <section className="signup__inputs">
                <div className="signup__double">
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: "Please enter first name" }}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <IonInput
                        fill="outline"
                        type="text"
                        label="First Name"
                        name="firstName"
                        labelPlacement="floating"
                        className="signup__inputs-input"
                        errorText={fieldState.error?.message}
                        value={value}
                        onIonChange={onChange}
                        required
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: "Please enter last name" }}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <IonInput
                        fill="outline"
                        type="text"
                        label="Last Name"
                        name="lastName"
                        labelPlacement="floating"
                        className="signup__inputs-input"
                        errorText={fieldState.error?.message}
                        value={value}
                        onIonChange={onChange}
                        required
                      />
                    )}
                  />
                </div>

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
                      name="email"
                      labelPlacement="floating"
                      className="signup__inputs-input"
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
                      className="signup__inputs-input"
                      value={value}
                      onIonInput={onChange}
                      errorText={fieldState.error?.message}
                      required
                    >
                      <IonIcon
                        icon={showPassword ? eye : eyeOff}
                        className="signup__inputs-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </IonInput>
                  )}
                />
              </section>
              <IonText className="ion-text-center signup__text">
                I&apos;ve read and agree to the{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </IonText>
              <IonButton
                expand="full"
                className="signup__button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <IonSpinner name="circles" /> : "Signup"}
              </IonButton>
              <div className="signup__to-login">
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </fieldset>
          </form>
        </section>
      </section>
    </div>
  );
};
