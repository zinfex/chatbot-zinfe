/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const dotenv = require("dotenv");

dotenv.config();

const contents = [
  {
    role: "user",
    parts: [
      {
        text: "input: Quem é você?",
      },
      {
        text: "output: Sou Zinfe, um professor de programação para ajudar os usuários tecnologias. 😊 \n\nO que posso fazer por você hoje? 😄",
      },
    ],
  },
];

async function Gemini(pergunta) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  contents.push({
    role: "user",
    parts: [
      {
        text: pergunta,
      },
    ],
  });

  const result = await model.generateContent({
    contents: contents,
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
  });
  console.log(result.response.text());

  contents.push({
    role: "model",
    parts: [
      {
        text: result.response.text(),
      },
    ],
  });

  return result.response.text();
}

module.exports = { Gemini };
