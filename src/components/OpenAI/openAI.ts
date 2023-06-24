import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});

console.log(response);
// engine: text-davinci-001
