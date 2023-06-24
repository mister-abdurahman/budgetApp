import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function tester(data: any) {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Optimize the following budget and Allocate a certain percentage of income to different expense categories: ${JSON.stringify(
          data
        )}`,
      },
    ],
  });
  return chatCompletion.data.choices[0].message;
}
