import { FC } from "react";

export interface Modal<T> {
  onSave: (data: T) => void;
  onClose: () => void;
  data?: T;
}

export type ModalComponent<T> = FC<Modal<T>>;
