import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { v4 as uuidv4 } from "uuid";

library.add(faAt, faGithub);

const Emailgpt = () => {
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    relationship: "",
    description: "",
    style: "",
    nameError: "",
    recipientError: "",
    relationshipError: "",
    descriptionError: "",
    styleError: "",
    formValid: false,
  });

  useEffect(() => {
    const { name, recipient, relationship, description, style } = formData;
    const formValid = name && recipient && relationship && description && style;
    setFormData({ ...formData, formValid });
  }, [
    formData.name,
    formData.recipient,
    formData.relationship,
    formData.description,
    formData.style,
  ]);

  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = value ? "" : "please enter your name";
        break;
      case "recipient":
        errorMessage = value ? "" : "please enter whom you want to send to";
        break;
      case "relationship":
        errorMessage = value ? "" : "please enter the relationship between you";
        break;
      case "description":
        errorMessage = value ? "" : "please enter about the email content";
        break;
      case "style":
        errorMessage = value ? "" : "please choose the email style";
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: errorMessage,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResults("");
    if (!formData.formValid) {
      alert();
    } else {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          recipient: formData.recipient,
          relationship: formData.relationship,
          description: formData.description,
          style: formData.style,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = response.body;
      if (!data) {
        return;
      }

      decode(data, setResults);

      setFormData({
        ...formData,
        name: "",
        recipient: "",
        relationship: "",
        description: "",
        style: "",
      });
    }
  };
  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto">
      <nav className="flex flex-col justify-between my-6 lg:flex-row">
        <div className="flex space-x-4 justify-center">
          <FontAwesomeIcon icon={faAt} className="w-16 h-16" />
          <div className="text-2xl">
            <p>Fill the form,</p>
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
              placeholder="My name is"
              value={formData.name}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.nameError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.nameError}
              </span>
            )}
            <input
              className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="recipient"
              placeholder="This email is for"
              value={formData.recipient}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.recipientError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.recipientError}
              </span>
            )}
            <input
              className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="relationship"
              placeholder="He/She is my"
              value={formData.relationship}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.relationshipError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.relationshipError}
              </span>
            )}
            <select
              className=" appearance-none bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="style"
              value={formData.style}
              autoComplete="off"
              onChange={handleChange}
            >
              <option value="">Choose a style</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
            {formData.styleError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.styleError}
              </span>
            )}
            <textarea
              className="bg-gray-200 px-3 py-1 outline-0 h-24 rounded-b hover:bg-gray-300 duration-300"
              style={{ resize: "none" }}
              type="textarea"
              name="description"
              placeholder="Here's the thing"
              value={formData.description}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.descriptionError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.descriptionError}
              </span>
            )}
          </div>
          <button
            className="border-[0.5px] outline-0 w-48 mt-6 mb-3 p-1 rounded bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-white duration-300"
            type="submit"
            disabled={!formData.formValid}
          >
            Generate Email
          </button>
        </form>
      </div>
      <div className="mt-12 mx-2">{results}</div>
    </div>
  );
};

const decode = async (data, setResults) => {
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    if (chunkValue.includes("\n")) {
      const words = chunkValue.split("\n");
      for (let i = 0; i < words.length; i++) {
        if (words[i] === "") {
          setResults((prev) => [...prev, <br key={uuidv4()} />]);
        } else {
          setResults((prev) => [...prev, words[i]]);
        }
      }
    } else {
      setResults((prev) => [...prev, chunkValue]);
    }
  }
};

export default Emailgpt;
