import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI();

// Helper function to prevent translation of specific fields
function preventTranslation(obj) {
  const doNotTranslate = ["id", "blockType"];

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => preventTranslation(item));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (doNotTranslate.includes(key) || key.toLowerCase().includes("slug")) {
        return [key, `__DO_NOT_TRANSLATE__${value}`];
      }
      return [key, preventTranslation(value)];
    }),
  );
}

// Helper function to restore original values
function restoreOriginalValues(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => restoreOriginalValues(item));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (
        typeof value === "string" &&
        value.startsWith("__DO_NOT_TRANSLATE__")
      ) {
        return [key, value.replace("__DO_NOT_TRANSLATE__", "")];
      }
      return [key, restoreOriginalValues(value)];
    }),
  );
}

export async function translate(fields, targetLanguage = "zh") {
  console.log(`Starting translation to ${targetLanguage}`);

  try {
    console.log("Sending request to OpenAI API");
    const startTime = Date.now();

    // Prepare fields for translation
    const preparedFields = preventTranslation(fields);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a professional translator.",
        },
        {
          role: "user",
          content: `Translate the following fields to Chinese. Don't translate people's names. Don't translate any value that starts with __DO_NOT_TRANSLATE__. Provide the response as raw JSON without formatting or code blocks.\n\n${JSON.stringify(preparedFields)}`,
        },
      ],
      temperature: 0.2,
    });

    const endTime = Date.now();
    console.log(
      `Received response from OpenAI API (took ${endTime - startTime}ms)`,
    );

    let result = JSON.parse(completion.choices[0].message.content);

    // Restore original values for fields that should not be translated
    result = restoreOriginalValues(result);

    console.log("Translated fields:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Translation error:", error);
    console.log("Returning original fields due to translation failure");
    return fields;
  }
}
