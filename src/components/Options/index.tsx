import { useSocket } from "@reactivers/use-socket";
import Option from "components/Option";
import { FC, useEffect } from "react";
import { addMessage } from "redux/features/chat";
import { useAppDispatch } from "redux/hooks";
import { IOptionsProps } from "./types";

const Options: FC<IOptionsProps> = ({ options }) => {
    const { connect, sendData } = useSocket()
    const dispatch = useAppDispatch();

    const onClick = (option: string) => {
        const request = {
            author: "user",
            message: option,
            date: new Date().toString()
        };
        sendData(JSON.stringify(request))
        dispatch(addMessage({ message: request }))
    }

    useEffect(() => {
        connect()
    }, [connect])


    return (
        <div className="flex justify-around items-center">
            {options.map((option, index) => {
                return (
                    <Option key={index}
                        option={option}
                        onClick={() => {
                            onClick(option)
                        }} />
                )
            })
            }
        </div>
    )
};

export default Options;