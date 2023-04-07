import { useState } from "react";

const Home = () => {
  const [nameInput, setNameInput] = useState("");
  const [relationshipInput, setRelationshipInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [results, setResults] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          relationship: relationshipInput,
          description: descriptionInput,
        }),
      });

      const data = await response.json();
      console.log(data.result);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResults(parser(data.result));
      console.log(results);
      setNameInput("");
      setRelationshipInput("");
      setDescriptionInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="max-w-2xl w-full mx-auto bg-gradient-to-br from-green-200 to-green-700 rounded">
        <form
          className="flex flex-col items-center bg-zinc-800 m-1 pt-2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full px-4">
            <input
              className="bg-zinc-700 px-3 py-1 outline-0 rounded-t"
              type="text"
              name="name"
              placeholder="his/her name"
              value={nameInput}
              autoComplete="off"
              onChange={(e) => setNameInput(e.target.value)}
            />
            <input
              className="bg-zinc-700 px-3 py-1 outline-0"
              type="text"
              name="relationship"
              placeholder="he/she is my"
              value={relationshipInput}
              autoComplete="off"
              onChange={(e) => setRelationshipInput(e.target.value)}
            />
            <textarea
              className="bg-zinc-700 px-3 py-1 outline-0 h-24 rounded-b"
              style={{ resize: "none" }}
              type="textarea"
              name="description"
              placeholder="I wanna tell him/her"
              value={descriptionInput}
              autoComplete="off"
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <button
            className="border-[0.5px] outline-0 w-48 my-2 p-1 rounded"
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

const parser = (result) => {
  const lines = result.split("\n");
  return lines.map((line, index) => {
    if (line === "") {
      return <br key={index} />;
    } else {
      return <p key={index}>{line}</p>;
    }
  });
};

export default Home;
