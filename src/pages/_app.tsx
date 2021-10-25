import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { UIDReset } from "react-uid";

import { ChatProvider } from "../contexts/ChatContext";
import { useApollo } from "../graphql/apolloClient";

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <UIDReset>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </UIDReset>
    </ApolloProvider>
  );
}
