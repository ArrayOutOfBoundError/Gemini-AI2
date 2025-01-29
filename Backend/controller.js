import { GoogleGenerativeAI } from "@google/generative-ai";
import { History } from "./model.js";
import * as fs from "node:fs";

const genAI = async (req, res) => {
  try {
    console.log("Request body: ", req.body);
    console.log("Request file: ", req.file);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    function fileToGenerativePart(path, mimeType) {
      return {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType,
        },
      };
    }

    const prompt = req.body.request;
    const file = req.file;

    if (!prompt) {
      return res.status(400).json({ error: "Enter your query first." });
    }

    const history = await History.create({ request: prompt });
    const imagePart = file
      ? fileToGenerativePart(file.path, file.mimetype)
      : undefined;

    let responseText;
    if (!file) {
      const result = await model.generateContent(prompt);
      responseText = result.response.text() || "Sorry, no content returned.";
    } else {
      const result2 = await model.generateContent([prompt, imagePart]);
      responseText = result2.response.text() || "Sorry, no content returned.";
    }
    responseText = responseText.replace(/\*/g, "");
    
    res.status(200).json({ content: responseText });
    console.log("Generated content:", responseText);
    history.response = responseText;
    await history.save();
  } catch (error) {
    console.error("Error in genAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { genAI };
