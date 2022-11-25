import { MutableRefObject } from "react";

export interface ISuggestionsProps {
  textFieldRef: MutableRefObject<HTMLInputElement>;
  onChange: (message: string) => void;
  message: string;
}
