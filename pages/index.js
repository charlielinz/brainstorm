import { useEffect, useState } from "react";

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
    setRecipientInput("")
    setRelationshipInput("");
    setDescriptionInput("");
  };
  return (
    <div className="flex flex-col">
      <div className="max-w-2xl w-full mx-auto bg-gradient-to-br from-gray-300 to-gray-700 rounded">
        <form
          className="flex flex-col items-center bg-gray-100 m-1 pt-2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full px-4">
            <input
              className="bg-gray-200 px-3 py-1 outline-0 rounded-t"
              type="text"
              name="name"
              placeholder="my name is"
              value={nameInput}
              autoComplete="off"
              onChange={(e) => setNameInput(e.target.value)}
            />
            <input
              className="bg-gray-200 px-3 py-1 outline-0"
              type="text"
              name="recipientInput"
              placeholder="write this to"
              value={recipientInput}
              autoComplete="off"
              onChange={(e) => setRecipientInput(e.target.value)}
            />
            <input
              className="bg-gray-200 px-3 py-1 outline-0"
              type="text"
              name="relationship"
              placeholder="he/she is my"
              value={relationshipInput}
              autoComplete="off"
              onChange={(e) => setRelationshipInput(e.target.value)}
            />
            <textarea
              className="bg-gray-200 px-3 py-1 outline-0 h-24 rounded-b"
              style={{ resize: "none" }}
              type="textarea"
              name="description"
              placeholder="describe the thing"
              value={descriptionInput}
              autoComplete="off"
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <button
            className="border-[0.5px] outline-0 w-48 my-2 p-1 rounded bg-zinc-800 text-gray-200"
            type="submit"
          >
            Generate Email
          </button>
        </form>
      </div>
      <div>{results}</div>
    </div>
  );
};

export default Home;
