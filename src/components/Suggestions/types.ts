import { RefObject } from "react";

export interface ISuggestionsProps {
  textFieldRef: RefObject<HTMLInputElement>;
  onChange: (message: string) => void;
  message: string;
}
