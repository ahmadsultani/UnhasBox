import { SelectChangeEventDetail } from "@ionic/react";

export interface InputChangeEventDetail {
  value?: string | null;
  event?: Event;
}
export interface InputCustomEvent<
  T = InputChangeEventDetail | SelectChangeEventDetail,
> extends CustomEvent {
  detail: T;
  target: HTMLIonInputElement;
}
