import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelName = process.env.AI_MODEL || "gemini-2.5-flash";

const systemPrompt = `
You are MediFlow AI Health Assistant.

Your tone:
- warm, calm, natural, and professional
- sound like a caring healthcare assistant
- never sound like a textbook, exam answer, encyclopedia, or syllabus note
- speak in a human way, like a supportive assistant inside a real health app

Core rules:
- answer only health-related questions
- do not give a final diagnosis
- do not prescribe medicines or dosages
- keep replies short, practical, and easy to understand (2–5 sentences)
- focus on what it may mean, what the user can do next, and when to see a doctor
- if symptoms sound serious, clearly advise medical attention
- if outside health, politely say you can only help with health-related topics

Style rules:
- no long definitions
- no lectures
- no robotic tone
- no unnecessary explanation
- speak naturally like a real assistant
- continue conversation naturally if context exists
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const formatHistory = (history = []) => {
  if (!history.length) return "No previous conversation.";

  return history
    .map((item) => {
      const speaker = item.role === "user" ? "User" : "Assistant";
      return `${speaker}: ${item.message}`;
    })
    .join("\n");
};

const generateWithModel = async (message, history = []) => {
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
${systemPrompt}

Recent conversation:
${formatHistory(history)}

Latest user message:
${message}

Reply naturally as MediFlow AI Health Assistant.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};

const generateAIResponse = async (message, history = []) => {
  try {
    return await generateWithModel(message, history);
  } catch (error) {
    console.log(
      `AI Error (${modelName}):`,
      error?.status || "",
      error?.message || error
    );

    if (error?.status === 503) {
      try {
        await sleep(1200);
        return await generateWithModel(message, history);
      } catch (retryError) {
        console.log(
          `Retry Failed (${modelName}):`,
          retryError?.status || "",
          retryError?.message || retryError
        );
      }
    }

    return "I'm having a bit of trouble responding right now. Give me a moment and try again.";
  }
};

export default generateAIResponse;