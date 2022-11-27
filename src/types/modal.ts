import { FC } from "react";

export interface Modal<T> {
  close: boolean;
  onSave: (data: T) => void;
  onClose: () => void;
  data?: T;
}

export type ModalComponent<T> = FC<Modal<T>>;
