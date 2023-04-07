import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faAt, faGithub);

const Home = () => {
  const [nameInput, setNameInput] = useState("");
  const [recipientInput, setRecipientInput] = useState("");
  const [relationshipInput, setRelationshipInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResults("");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        recipient: recipientInput,
        relationship: relationshipInput,
        description: descriptionInput,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    let count = 0;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      if (chunkValue === "\n") {
        setResults((prev) => [...prev, <br key={count} />]);
      } else {
        setResults((prev) => [...prev, chunkValue]);
      }
      count += 1;
    }
    setNameInput("");
    setRecipientInput("");
    setRelationshipInput("");
    setDescriptionInput("");
  };
  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto">
      <nav className="flex flex-col justify-between my-6 lg:flex-row">
        <div className="flex space-x-4 justify-center">
          <FontAwesomeIcon icon={faAt} className="w-16 h-16" />
          <div className="text-2xl">
            <p>Come BrainStorm,</p>
            <p>Email reborn.</p>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2 mt-6 lg:mt-0">
          <span>Support me on</span>
          <a
            className="flex items-center space-x-1 hover:text-zinc-600 duration-200"
            href="https://github.com/charlielinz/brainstorm"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            <span className="align-middle ">Github</span>
          </a>
        </div>
      </nav>
      <div className="bg-gradient-to-br from-gray-300 to-gray-700 rounded transition-colors">
        <form
          className="flex flex-col items-center bg-gray-100 m-2 pt-4 rounded-lg"
          onSubmit={handleSubmit}
        >
          <p className="text-2xl py-4">Email Info</p>
          <div className="flex flex-col w-full px-4 ">
            <input
              className="bg-gray-200 px-3 py-1 outline-0 rounded-t border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="name"
              placeholder="my name is"
              value={nameInput}
              autoComplete="off"
              onChange={(e) => setNameInput(e.target.value)}
            />
            <input
              className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="recipientInput"
              placeholder="this email is for"
              value={recipientInput}
              autoComplete="off"
              onChange={(e) => setRecipientInput(e.target.value)}
            />
            <input
              className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="relationship"
              placeholder="he/she is my"
              value={relationshipInput}
              autoComplete="off"
              onChange={(e) => setRelationshipInput(e.target.value)}
            />
            <textarea
              className="bg-gray-200 px-3 py-1 outline-0 h-24 rounded-b hover:bg-gray-300 duration-300"
              style={{ resize: "none" }}
              type="textarea"
              name="description"
              placeholder="I want to say"
              value={descriptionInput}
              autoComplete="off"
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <button
            className="border-[0.5px] outline-0 w-48 mt-6 mb-3 p-1 rounded bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-white duration-300"
            type="submit" 
          >
            Generate Email
          </button>
        </form>
      </div>
      <div className="mt-12 mx-2">{results}</div>
    </div>
  );
};

export default Home;
