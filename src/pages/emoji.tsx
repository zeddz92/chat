import Head from "next/head";

import { Container } from "../components/Container";
import { Conversation } from "../components/Conversation";
import { EmojiPicker } from "../components/EmojiPicker";
import { SidePanel } from "../components/SidePanel/SidePanel";

export default function Emoji() {
  return (
    <div className="h-screen md:py-6" data-testid="chat">
      <Head>
        <title>Emoji</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex h-full">
          <EmojiPicker />
        </div>
      </Container>
    </div>
  );
}
