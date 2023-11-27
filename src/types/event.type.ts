export interface InputChangeEventDetail {
  value?: string | null;
  event?: Event;
}
export interface InputCustomEvent<T = InputChangeEventDetail>
  extends CustomEvent {
  detail: T;
  target: HTMLIonInputElement;
}
