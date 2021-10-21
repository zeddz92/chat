import "../styles/global.css";

import { AppProps } from "next/app";
import { ChatProvider } from "../contexts/ChatContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <Component {...pageProps} />
    </ChatProvider>
  );
}
