import { useSocket } from "@reactivers/use-socket";
import SendButton from "components/SendButton";
import Suggestions from "components/Suggestions";
import { useEffect, useRef, useState } from "react";

const TextField = () => {
    const { connect, sendData } = useSocket()
    const [message, setMessage] = useState('');
    const textField = useRef<HTMLInputElement>(null);

    const sendMessage = (messageData) => {
        sendData(JSON.stringify(messageData));
    }

    const onSend = () => {
        if (!message) return;
        const request = {
            author: "user",
            message,
            date: new Date()
        };
        sendMessage(request);
        setMessage("")

    }

    const onChange = (value) => {
        const request = {
            author: "user",
            message: value,
            suggest: true,
            date: new Date()
        };
        sendMessage(request);
        setMessage(value);
    }

    useEffect(() => {
        connect()
    }, [connect])

    return (
        <div className={'flex items-center justify-center relative input-container'}>
            <input type="text"
                ref={textField}
                onChange={e => onChange(e.target.value)}
                value={message}
                className="w-full text-field"
                onKeyPress={e => e.key === "Enter" ? onSend() : null}
            />
            <Suggestions
                textFieldRef={textField}
                message={message}
                onChange={onChange}
            />
            <SendButton disabled={!message} onSend={onSend} />
        </div>
    )
}

export default TextField;