import { OpenAIStream } from "../../utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, position, recipient, description, date } = await req.json();

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `My name is ${name} and I work as a ${position} now. I am going to submit my resignation to my boss ${recipient} and here is the reason: ${description}. My last working day will be ${date}. Can you give me a Formal sample of this email? `,
        },
      ],
      stream: true,
      max_tokens: 2048,
      temperature: 0.1,
    };
    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } else {
    return new Response();
  }
};

export default handler;
