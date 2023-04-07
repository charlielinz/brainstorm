import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generate = async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  const { name, relationship, description } = req.body;
  if (name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter name",
      },
    });
    return;
  }
  if (relationship.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter relationship",
      },
    });
    return;
  }
  if (description.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter description",
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I want to write a email to ${name}, and he is my ${relationship}. Here is the thing I want to tell him: ${description} Can you give me a smooth version? `,
        },
      ],
    });
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};

export default generate;
