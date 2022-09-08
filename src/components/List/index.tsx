import { useSocket } from "@reactivers/use-socket";
import { FC, useEffect } from "react";
import { AUTHOR_ENUM } from "utils/types";
import { IListProps } from "./types";

const List: FC<IListProps> = ({ message }) => {
    const { list } = message;
    const { connect, sendData } = useSocket({ wss: true })

    const onClick = (listItem: string) => {
        sendData(JSON.stringify({
            author: AUTHOR_ENUM.USER,
            message: listItem,
            date: new Date()
        }))
    }

    useEffect(() => {
        connect({ url: "coffeebot.mrtgny.com/ws" })
    }, [connect])

    return (
        <div className="list flex justify-center items-center">
            <div className="m-2 p-2 w-full">
                <ul className="list-none m-0 p-0 w-full">
                    {list.map((listItem, index) => {
                        return <li key={index} className="m-2 p-2 list-item"
                            onClick={() => onClick(listItem)}>{listItem}</li>
                    })}
                </ul>
            </div>
        </div>
    )
};

export default List;