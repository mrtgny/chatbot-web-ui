import { useSocket } from "@reactivers/use-socket";
import Option from "components/Option";
import { FC, useEffect } from "react";
import { IOptionsProps } from "./types";

const Options: FC<IOptionsProps> = ({ options }) => {
    const { connect, sendData } = useSocket()

    const onClick = (option: string) => {
        sendData(JSON.stringify({
            author: "user",
            message: option,
            date: new Date()
        }))
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