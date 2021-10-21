import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full justify-center px-20 h-screen"></main>
    </div>
  );
}
