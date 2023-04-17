import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

const Resignation = () => {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    recipient: "",
    date: formattedDate,
    description: "",
    nameError: "",
    companyError: "",
    positionError: "",
    recipientError: "",
    dateError: "",
    descriptionError: "",
    formValid: false,
  });

  useEffect(() => {
    const { name, company, position, recipient, date, description } = formData;
    const formValid =
      name && company && position && recipient && date && description;
    setFormData({ ...formData, formValid });
  }, [
    formData.name,
    formData.company,
    formData.position,
    formData.recipient,
    formData.date,
    formData.description,
  ]);

  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = value ? "" : "please enter your name";
        break;
      case "company":
        errorMessage = value ? "" : "please enter your company name";
        break;
      case "position":
        errorMessage = value ? "" : "please enter your position";
        break;
      case "recipient":
        errorMessage = value ? "" : "please enter your boss's name";
        break;
      case "date":
        errorMessage = value ? "" : "please enter the resignation date";
        break;
      case "description":
        errorMessage = value ? "" : "please enter the reason of resignation";
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
          company: formData.company,
          position: formData.position,
          recipient: formData.recipient,
          date: formData.date,
          description: formData.description,
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
        company: "",
        position: "",
        recipient: "",
        date: "",
        description: "",
      });
    }
  };
  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto">
      <div className="bg-gradient-to-br from-gray-300 to-gray-700 rounded transition-colors mt-12">
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
              className="bg-gray-200 px-3 py-1 outline-0 rounded-t border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="company"
              placeholder="my company name is"
              value={formData.company}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.companyError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.companyError}
              </span>
            )}
            <input
              className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="position"
              placeholder="my position is"
              value={formData.position}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.positionError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.positionError}
              </span>
            )}
            <input
              className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="text"
              name="recipient"
              placeholder="my boss's name is"
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
              className=" appearance-none bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
              type="date"
              name="date"
              value={formData.date}
              autoComplete="off"
              onChange={handleChange}
            />
            {formData.dateError && (
              <span className="text-red-400 text-sm pl-3 ">
                {formData.dateError}
              </span>
            )}
            <textarea
              className="bg-gray-200 px-3 py-1 outline-0 h-24 rounded-b hover:bg-gray-300 duration-300 resize-none"
              type="textarea"
              name="description"
              placeholder="the reason of my resignation"
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

export default Resignation;
