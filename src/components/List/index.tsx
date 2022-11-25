import { useSocket } from "@reactivers/use-socket";
import { FC, useEffect } from "react";
import { addMessage } from "redux/features/chat";
import { useAppDispatch } from "redux/hooks";
import { AUTHOR_ENUM } from "utils/types";
import { IListProps } from "./types";

const List: FC<IListProps> = ({ message }) => {
  const { list } = message;
  const { connect, sendData } = useSocket();
  const dispatch = useAppDispatch();

  const onClick = (listItem: string) => {
    const request = {
      author: AUTHOR_ENUM.USER,
      message: listItem,
      date: new Date().toString(),
    };
    sendData(JSON.stringify(request));
    dispatch(addMessage({ message: request }));
  };

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <div className="list flex justify-center items-center">
      <div className="m-2 p-2 w-full">
        <ul className="list-none m-0 p-0 w-full">
          {list.map((listItem, index) => {
            return (
              <li
                key={index}
                className="m-2 p-2 list-item"
                onClick={() => onClick(listItem)}
              >
                {listItem}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
