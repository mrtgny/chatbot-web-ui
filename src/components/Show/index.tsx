import { FC, PropsWithChildren } from "react";
import { IShow } from "./types";

const Show: FC<PropsWithChildren<IShow>> = ({ showIf, children }) => {
  if (showIf) return <>{children}</>;
  return null;
};

export default Show;
