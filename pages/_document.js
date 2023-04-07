import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-zinc-900 text-gray-100">
        <Main />
        <NextScript />
      </body>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
    </Html>
  );
}
