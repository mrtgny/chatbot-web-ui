import { MouseEventHandler } from "react";

export interface IOptionProps {
    option: string,
    onClick: MouseEventHandler<HTMLDivElement>
}