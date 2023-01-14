import '@app/styles/globals.scss';
import '@app/styles/styles.scss';
import type {AppProps} from 'next/app'
import ChatContextProvider from "@app/modules/chat-context";

export default function App({Component, pageProps}: AppProps) {
  return <ChatContextProvider>
    <Component {...pageProps} />
  </ChatContextProvider>
}
