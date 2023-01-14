import {createContext, useContext, useEffect, useMemo, useState} from "react";

const storageKey = 'local-chat';

export interface MessageContent {
  username: string;
  message: string;
}

interface Context {
  messages: MessageContent[];
  setMessages: (messages: MessageContent[]) => any;
  sendChat: (username: string, message: string) => any;
}

export const ChatContext = createContext<Context>({
  setMessages: () => false,
  sendChat: () => false,
  messages: [],
});

function ChatContextProvider(props: any) {
  const [messages, setMessages] = useState<MessageContent[]>([]);

  useEffect(() => {
    const localStage = localStorage.getItem(storageKey);
    if (localStage) {
      try {
        let savedMessages = JSON.parse(localStage) || {};
        setMessages(savedMessages);
      } catch (e) {
        //Ignore
      }
    }else {
      localStorage.setItem(storageKey, "[]");
    }
  }, []);
  useEffect(() => {
    if (messages && messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages]);
  const sendChat = (username: string, message: string) => {
    setMessages(curMess => [...curMess, {username, message}]);
  };
  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        sendChat
      }}
      {...props} />)
}


export default ChatContextProvider;

export const useChatContext = () => useContext(ChatContext);
