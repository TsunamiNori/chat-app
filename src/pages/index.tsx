import {useEffect, useMemo, useRef, useState} from "react";
import {MessageContent, useChatContext} from "@app/modules/chat-context";

export default function Home() {
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const {messages, sendChat} = useChatContext();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [pagedMessages, setPagedMessages] = useState<MessageContent[]>([]);
  const chatBoxRef = useRef<any>();
  const [firstLoad, setFirstLoad] = useState(false);
  useMemo(() => {
    setPagedMessages([...messages].slice().reverse().slice(0, page * 10).reverse());
    if (!firstLoad && chatBoxRef.current) {
      setFirstLoad(true);
      setTimeout(() => {
        chatBoxRef.current.scrollTo({top: chatBoxRef.current.offsetTop + chatBoxRef.current.offsetHeight});
      }, 500);
    }
    return {messages, page};
  }, [messages, page, firstLoad]);

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      if (message && message.length >= 3) {
        sendMessage();
      }
    }
  };
  const sendMessage = () => {
    sendChat(username, message);
    setMessage("");
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({top: chatBoxRef.current.offsetTop + chatBoxRef.current.offsetHeight});
    }
  };

  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop === 0) {
      setPage(p => p + 1);
    }
  };
  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-gray-800">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        {!chosenUsername ? (
          <>
            <h3 className="font-bold text-white text-xl">
              How people should call you?
            </h3>
            <input
              type="text"
              placeholder="Your name..."
              value={username}
              className="p-3 rounded-md outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={() => {
                setChosenUsername(username);
              }}
              className="bg-white rounded-md px-4 py-2 text-xl"
            >
              Go!
            </button>
          </>
        ) : <>
          <p className="font-bold text-white text-xl">
            Your username: {username}
          </p>
          <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
            <div className="h-full last:border-b-0 overflow-y-scroll" ref={chatBoxRef}
                 onScroll={handleScroll}>
              {pagedMessages.map((msg, i) => {
                return (
                  <div
                    className="w-full py-1 px-2 border-b border-gray-200"
                    key={i}
                  >
                    {msg.username} : {msg.message}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-300 w-full flex rounded-bl-md">
              <input
                type="text"
                placeholder="New message..."
                value={message}
                className="outline-none py-2 px-2 rounded-bl-md flex-1"
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeypress}
              />
              <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                <button className="group-hover:text-white px-3 h-full" onClick={() => sendMessage()}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </>}
      </main>
    </div>
  )
}
