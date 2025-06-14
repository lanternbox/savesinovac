import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// openai automatically uses OPENAI_API_KEY from .env

const openai = new OpenAI();

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "Write a haiku about recursion in programming.",
    },
  ],
});

console.log(completion.choices[0].message);
