import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

library.add(faAt, faGithub);

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
    <nav className="fixed flex flex-col px-2 py-4 h-screen w-64 bg-zinc-700 text-gray-100">
      <div className="flex flex-col pt-2 pb-6 border-b-[1px] border-gray-400">
        <Link href="/" className="p-2">
          <div className="flex gap-2">
            <FontAwesomeIcon icon={faAt} className="w-8 h-8" />
            <div className="text-2xl">
              <p>GEmail</p>
            </div>
          </div>
        </Link>
      </div>
      <ul className="flex flex-col py-2">
        <Link href="/resignation" className={classNameByPath("/resignation")}>
          Resignation GPT
        </Link>
      </ul>
      <div className="flex justify-center space-x-2 mt-auto">
        <span>Support me on</span>
        <a
          className="flex items-center space-x-1 hover:text-zinc-300 duration-200"
          href="https://github.com/charlielinz/brainstorm"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
          <span className="align-middle ">Github</span>
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
