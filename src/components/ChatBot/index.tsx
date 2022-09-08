import { useSocket } from "@reactivers/use-socket";
import ChatContainer from "components/ChatbotContainer";
import TextField from "components/TextField";
import { useEffect } from "react";

const ChatBot = () => {

    const onOpen = () => {
        sendData(JSON.stringify({ message: "init-chatbot" }))
    }

    const { connect, sendData } = useSocket({ wss: true, onOpen })

    useEffect(() => {
        connect({ url: "coffeebot.mrtgny.com/ws" })
    }, [connect])

    return (
        <div className="page flex justify-center items-center">
            <div className="container flex flex-col justify-between">
                <div className="m-2 p-2 overflow-auto" id="chat-container">
                    <ChatContainer />
                </div>
                <TextField />
            </div>
        </div>
    )
}

export default ChatBot;