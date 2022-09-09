import { useSocket } from "@reactivers/use-socket";
import ChatContainer from "components/ChatbotContainer";
import TextField from "components/TextField";
import { useCallback, useEffect } from "react";
import { isBrowser } from "utils/functions";

const ChatBot = () => {
    const { connect, sendData } = useSocket()

    const onOpen = useCallback(() => {
        sendData(JSON.stringify({ message: "init-chatbot" }))
    }, [sendData])


    useEffect(() => {
        connect({ onOpen })
    }, [connect, onOpen])

    const height = isBrowser() ? `calc(${window.innerHeight}px - 86px)` : `calc(100vh - 86px)`;

    return (
        <div className="page flex justify-center items-center">
            <div className="container flex flex-col">
                <div className="m-2 p-2 overflow-auto" id="chat-container" style={{ height }}>
                    <ChatContainer />
                </div>
                <TextField />
            </div>
        </div>
    )
}

export default ChatBot;