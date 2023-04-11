import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();
  const classNameByPath = (path) => {
    if (router.pathname === path) {
      return "p-2 bg-zinc-500 rounded";
    } else {
      return "p-2 rounded hover:bg-zinc-600";
    }
  };
  return (
    <nav className="flex flex-col px-2 py-4 h-screen w-64 bg-zinc-700 text-gray-100">
      <div className="flex flex-col pt-2 pb-6 border-b-[1px] border-gray-400">
        <Link href="/" className={classNameByPath("/")}>
          Home
        </Link>
      </div>
      <ul className="flex flex-col space-y-1 py-2">
        <Link href="/emailgpt" className={classNameByPath("/emailgpt")}>
          Email GPT
        </Link>
        <Link href="/" className={classNameByPath("/a")}>
          Apple GPT
        </Link>
        <Link href="/" className={classNameByPath("/b")}>
          Banana GPT
        </Link>
        <Link href="/" className={classNameByPath("/c")}>
          Car GPT
        </Link>
        <Link href="/" className={classNameByPath("/d")}>
          Diamond GPT
        </Link>
        <Link href="/" className={classNameByPath("/ed")}>
          Egg GPT
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
