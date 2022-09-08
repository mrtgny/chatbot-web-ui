import { FC } from "react";
import { IOptionProps } from "./types";

const Option: FC<IOptionProps> = ({ option, onClick }) => {
    return (
        <div className="m-4 p-4 option-item" onClick={onClick}>
            {option}
        </div>
    )
};

export default Option;