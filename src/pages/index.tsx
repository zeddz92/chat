import { Container } from "../components/Container";
import Head from "next/head";

import { Chat } from "../components/Chat";
import { Message } from "../components/Message";
import { UsersMenu } from "../components/UsersMenu";
import { channels } from "../constants";
import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Messages } from "../components/Messages";

export default function Home() {
  const { channel, updateState } = useContext(ChatContext);
  return (
    <div className="h-screen py-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex h-full">
          <div className="w-3/5">
            <UsersMenu />

            <div className="px-4 w-full  mt-2">
              <div className="text-sm text-gray-600 py-1">Channels</div>
              {channels.map((ch) => (
                <Chat
                  name={ch.name}
                  picture={ch.picture}
                  selected={channel.id === ch.id}
                />
              ))}
            </div>
          </div>

          <Messages />
        </div>
      </Container>
      {/* Messages component side/ */}
    </div>
  );
}
