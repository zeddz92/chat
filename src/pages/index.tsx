import { Container } from "../components/Container";
import Head from "next/head";

import { Container } from "../components/Container";

import { SidePanel } from "../components/SidePanel/SidePanel";

export default function Home() {
  const { channel, updateState } = useContext(ChatContext);
  return (
    <div className="h-screen py-6">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex h-full">
          <SidePanel />
        </div>
      </Container>
      {/* Messages component side/ */}
    </div>
  );
}
