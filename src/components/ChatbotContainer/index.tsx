import { useSocket } from "@reactivers/use-socket";
import ChatContent from "components/ChatContent";
import { useCallback, useEffect, useState } from "react";
import { IMessage } from "utils/types";

const ChatContainer = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { connect } = useSocket()

    const onMessage: (data: any, json: IMessage) => void = useCallback((_, json) => {
        if (json && !!json.suggest) return;
        setMessages(old => {
            return [...old.filter(i => json.status === 'typing' || i.status !== 'typing'), json]
        })
    }, [])

    useEffect(() => {
        const container = document.getElementById("chat-container");
        container.scrollTo(0, container.scrollHeight);
    }, [messages])


    useEffect(() => {
        connect({ onMessage })
    }, [connect, onMessage])

    return (
        <div className="w-full h-full" >
            <ChatContent messages={messages} />
        </div>
    );
}

export default ChatContainer;