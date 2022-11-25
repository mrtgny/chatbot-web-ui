import { MouseEventHandler } from "react";

export interface ISendButtonProps {
  onSend: MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
}
