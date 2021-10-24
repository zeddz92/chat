import { Container } from "../components/Container";
import Head from "next/head";

import { Container } from "../components/Container";
import { Conversation } from "../components/Conversation";
import { SidePanel } from "../components/SidePanel/SidePanel";

export default function Home() {
  const { channel, updateState } = useContext(ChatContext);
  return (
    <div className="h-screen py-6">
      <Head>
        <title>Messenger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex h-full">
          <SidePanel />
          <Conversation />
        </div>
      </Container>
    </div>
  );
}
