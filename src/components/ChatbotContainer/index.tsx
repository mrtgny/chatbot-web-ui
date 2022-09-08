import { useSocket } from "@reactivers/use-socket";
import ChatContent from "components/ChatContent";
import { useEffect, useState } from "react";
import { IMessage } from "utils/types";

const ChatContainer = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    const onMessage: (data: any, json: IMessage) => void = (_, json) => {
        if (json && !!json.suggest) return;
        setMessages(old => {
            return [...old.filter(i => json.status === 'typing' || i.status !== 'typing'), json]
        })
    }

    useEffect(() => {
        const container = document.getElementById("chat-container");
        container.scrollTo(0, container.scrollHeight);
    }, [messages])

    const { connect } = useSocket({ wss: true, onMessage })

    useEffect(() => {
        connect({ url: "coffeebot.mrtgny.com/ws" })
    }, [connect])

    return (
        <div className="w-full h-full" >
            <ChatContent messages={messages} />
        </div>
    );
}

export default ChatContainer;