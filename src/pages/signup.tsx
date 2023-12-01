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

import { useForm } from "@/hooks/useForm";
import { signup } from "@/services/auth";

import { TSignupForm } from "@/types/form.type";
import { TUser } from "@/types/user.type";

import "@/styles/signup.css";
import { useToast } from "@/hooks/useToast";
import { eye, eyeOff } from "ionicons/icons";

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

  const { values, handleChange, handleSubmit } = useForm<TSignupForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => mutateAsync(values),
  });

  function handleLogin(): void {
    throw new Error("Function not implemented.");
  }

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
          <form onSubmit={handleSubmit}>
            <fieldset className="signup__main" disabled={isLoading}>
              <section className="signup__inputs">
                <div className="signup__double">
                  <IonInput
                    fill="outline"
                    type="text"
                    label="First Name"
                    name="firstName"
                    labelPlacement="floating"
                    className="signup__inputs-input"
                    value={values.firstName}
                    onIonInput={handleChange}
                    required
                  />
                  <IonInput
                    fill="outline"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    labelPlacement="floating"
                    className="signup__inputs-input"
                    value={values.lastName}
                    onIonInput={handleChange}
                    required
                  />
                </div>
                <IonInput
                  fill="outline"
                  type="text"
                  label="Email Address"
                  name="email"
                  labelPlacement="floating"
                  className="signup__inputs-input"
                  value={values.email}
                  onIonInput={handleChange}
                  required
                />
                <IonInput
                  fill="outline"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  labelPlacement="floating"
                  className="signup__inputs-input"
                  value={values.password}
                  onIonInput={handleChange}
                  required
                >
                  <IonIcon
                    icon={showPassword ? eye : eyeOff}
                    className="signup__inputs-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </IonInput>
                <IonText className="ion-text-center signup__text">
                  I&apos;ve read and agree to the{" "}
                  <a href="/terms">Terms of Service</a> and{" "}
                  <a href="/privacy">Privacy Policy</a>
                </IonText>
              </section>
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
                  Already have an account?{" "}
                  <a href="/login" onClick={handleLogin}>
                    Login
                  </a>
                </p>
              </div>
            </fieldset>
          </form>
        </section>
      </section>
    </div>
  );
};
