import {createContext, useContext, useState} from "react";

interface MessageContent {
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
  const [messages, setMessages] = useState([] as any[]);

  const sendChat = (username: string, message: string) => {
    setMessages(curMess => [...curMess, {username, message}])
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
