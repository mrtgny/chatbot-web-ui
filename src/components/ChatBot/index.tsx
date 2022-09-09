import { useSocket } from "@reactivers/use-socket";
import ChatContainer from "components/ChatbotContainer";
import TextField from "components/TextField";
import usePageHeight from "hooks/usePageHeight";
import { useCallback, useEffect } from "react";

const ChatBot = () => {
    const { connect, sendData } = useSocket()
    const [height] = usePageHeight();

    const onOpen = useCallback(() => {
        sendData(JSON.stringify({ message: "init-chatbot" }))
    }, [sendData])

    useEffect(() => {
        connect({ onOpen })
    }, [connect, onOpen])

    return (
        <div className="page flex justify-center items-center">
            <div className="container flex flex-col translate-x-0" style={{ height: (height as number) - 86 }}>
                <div className="m-2 p-2 overflow-auto" id="chat-container" style={{ height: 'calc(100% - 56px)' }}>
                    <ChatContainer />
                </div>
                <div className="fixed w-full bottom-0">
                    <TextField />
                </div>
            </div>
        </div>
    )
}

export default ChatBot;