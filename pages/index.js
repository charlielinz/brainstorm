import { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';

const Home = () => {
  const [textInput, setTextInput] = useState("");
  const [results, setResults] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
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
      setTextInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Ask me"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <input type="submit" value="Generate" />
      </form>
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
