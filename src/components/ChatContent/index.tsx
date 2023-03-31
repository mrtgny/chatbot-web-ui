import ChatItem from "components/ChatItem";
import Coffees from "components/Coffees";
import List from "components/List";
import Options from "components/Options";
import Show from "components/Show";
import Typing from "components/Typing";
import { FC, Fragment } from "react";
import { IChatContentProps } from "./types";

const ChatContent: FC<IChatContentProps> = ({ messages }) => {
  return (
    <>
      {messages.map((item, index) => {
        const { name, message, list, options, status, coffees } = item;
        const isTyping = status === "typing";
        const isList = (list || []).length > 0;
        const isOptions = (options || []).length > 0;
        return (
          <Fragment key={index}>
            <Show showIf={!!name && !!coffees}>
              <Coffees name={name!} coffees={coffees!} />
            </Show>
            <Show showIf={isTyping}>
              <Typing />
            </Show>
            <Show showIf={!!message}>
              <ChatItem message={item} />
            </Show>
            <Show showIf={isList}>
              <List message={item} />
            </Show>
            <Show showIf={isOptions}>
              <Options options={options!} />
            </Show>
          </Fragment>
        );
      })}
    </>
  );
};

export default ChatContent;
