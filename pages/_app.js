import "@/styles/globals.css";
import Head from "next/head";
import Navigation from "@/components/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BrainstormGPT</title>
        <meta name="title" content="This is BrainstormGPT"></meta>
        <meta name="author" content="Charlie Lin"></meta>
        <meta
          name="description"
          content="Come BrainStorm, Email reborn."
        ></meta>
        {/* <meta name="image" content=></meta> */}
        <meta name="og:title" content="This is BrainstormGPT"></meta>
        <meta name="og:author" content="Charlie Lin"></meta>
        {/* <meta name="og:image" content=></meta> */}
        <meta
          name="og:description"
          content="It is all about life style."
        ></meta>
      </Head>
      <main className="flex">
        <Navigation />
        <Component {...pageProps} />
      </main>
    </>
  );
}
