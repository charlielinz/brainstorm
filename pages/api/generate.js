import { OpenAIStream } from "../../utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const { name, recipient, relationship, description } = await req.json();
  const payload = {
    model: "text-davinci-003",
    prompt: `My name is ${name} I want to write a email to ${recipient}, and he is my ${relationship}. Here is the thing I want to tell him: ${description} Can you give me a smooth version? `,
    stream: true,
    max_tokens: 2048,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
