import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
    });

    const text = response.text;

    res.status(200).json({ reply: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}
