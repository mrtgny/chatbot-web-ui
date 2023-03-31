import { useSocket } from "@reactivers/use-socket";
import { FC, useCallback, useEffect, useState } from "react";
import { IMessage } from "utils/types";
import { ISuggestionsProps } from "./types";

const Suggestions: FC<ISuggestionsProps> = ({
  textFieldRef,
  onChange,
  message,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { connect } = useSocket();

  const onSelect = (suggest: string) => {
    if (suggest.indexOf(message) === 0) {
      onChange(suggest + " ");
    } else {
      let splittedValue = message.split(" ");
      splittedValue = splittedValue.slice(0, splittedValue.length - 1);
      onChange(splittedValue.join(" ") + " " + suggest + " ");
    }
    textFieldRef.current?.focus();
  };

  const onMessage = useCallback((_: unknown, json: IMessage) => {
    if (json && json.suggest) {
      setSuggestions(json.message as string[]);
    }
  }, []);

  useEffect(() => {
    connect({ onMessage });
  }, [connect, onMessage]);

  if (!message) return null;
  return (
    <div className="absolute left-2 bottom-16 bg-gray-200/40 backdrop-blur-xl">
      {(suggestions || []).map((suggest, index) => {
        if (index < 5) {
          return (
            <div
              key={index}
              className="m-2 p-2  clickable"
              tabIndex={0}
              onClick={() => onSelect(suggest)}
              onKeyPress={(e) => e.key === "Enter" && onSelect(suggest)}
            >
              {suggest}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Suggestions;
