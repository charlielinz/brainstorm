import { v4 as uuidv4 } from "uuid";

export const decode = async (data, setResults) => {
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
  // setIsGenerating(false)
};
