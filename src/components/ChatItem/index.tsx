import classNames from "classnames";
import DateText from "components/DateText";
import { FC } from "react";
import { AUTHOR_ENUM } from "utils/types";
import { IChatItemProps } from "./types";

const ChatItem: FC<IChatItemProps> = ({ message: { author, message, date } }) => {
    const isAuthorChatbot = author === AUTHOR_ENUM.CHATBOT;
    return (
        <div className={classNames("flex", {
            "justify-end": !isAuthorChatbot,
            "justify-start": isAuthorChatbot,
        })}>
            <div className={classNames("p-2 m-2", {
                "chatbot-chat-item": isAuthorChatbot,
                "user-chat-item": !isAuthorChatbot,
            })}>
                <p className="min-w-[40px]">{message}</p>
                <DateText date={date} />
            </div>
        </div>
    )
}

export default ChatItem;