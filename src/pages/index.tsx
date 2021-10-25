import Head from "next/head";

import { Container } from "../components/Container";
import { Conversation } from "../components/Conversation";
import { SidePanel } from "../components/SidePanel/SidePanel";

export default function Home() {
  return (
    <div className="h-screen py-6" data-testid="chat">
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
