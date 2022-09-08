import classNames from "classnames";
import { FC } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { ISendButtonProps } from "./types";

const SendButton: FC<ISendButtonProps> = ({ onSend, disabled }) => {
    return (
        <div className="m-2">
            <div className={classNames("flex justify-center items-center", {
                "send-button-disabled": disabled,
                "send-button": !disabled
            })}
                onClick={onSend}>
                <AiOutlineSend className='w-[20px] h-[20px]' />
            </div>
        </div >
    )
}

export default SendButton;