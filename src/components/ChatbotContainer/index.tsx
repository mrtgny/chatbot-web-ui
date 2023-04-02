import { useSocket } from "@reactivers/use-socket";
import ChatContent from "components/ChatContent";
import { useCallback, useEffect } from "react";
import { addMessage } from "redux/features/chat";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { IMessage } from "utils/types";

const ChatContainer = () => {
  const messages = useAppSelector((state) => state?.chat?.messages);
  const dispatch = useAppDispatch();
  const { connect } = useSocket<IMessage>();

  const onMessage: (data: unknown, json: IMessage) => void = useCallback(
    (_, json) => {
      if (json && !!json.suggest) return;
      dispatch(addMessage({ message: json }));
    },
    [dispatch],
  );

  useEffect(() => {
    const container = document.getElementById("chat-container");
    container?.scrollTo(0, container?.scrollHeight);
  }, [messages]);

  useEffect(() => {
    connect({ onMessage });
  }, [connect, onMessage]);

  return (
    <div className="w-full h-full">
      <ChatContent messages={messages} />
    </div>
  );
};

export default ChatContainer;
