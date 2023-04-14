import "@/styles/globals.css";
import Head from "next/head";
import Navigation from "@/components/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GEmail</title>
        <meta name="title" content="This is GEmail"></meta>
        <meta name="author" content="Charlie Lin"></meta>
        <meta
          name="description"
          content="GEmail, generate genius email."
        ></meta>
        {/* <meta name="image" content=></meta> */}
        <meta name="og:title" content="This is GEmail"></meta>
        <meta name="og:author" content="Charlie Lin"></meta>
        {/* <meta name="og:image" content=></meta> */}
        <meta
          name="og:description"
          content="GEmail, generate genius email."
        ></meta>
      </Head>
      <main className="relative flex w-screen">
        <Navigation />
        <div className="w-screen ml-64">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
