import { GoogleGenAI, SchemaType, Type } from "@google/genai";
import { Rarity } from "../types";

const apiKey = process.env.API_KEY || ""; 
const ai = new GoogleGenAI({ apiKey });

/**
 * Analyzes a card image to extract basic stats and suggest a description.
 */
export const analyzeCardImage = async (base64Image: string, mimeType: string = "image/jpeg") => {
  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Analyze this game character card image.
      1. Identify the Rarity (e.g., Unique, Mystic Rare).
      2. Identify ATK and DEF numbers if visible.
      3. Identify the Character Name if visible (use "Unknown" if not).
      4. Generate a short, immersive RPG-style system log message in Korean describing how this character was obtained (e.g., "In the third session...").
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
            { text: prompt },
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image
                }
            }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rarity: { type: Type.STRING },
            characterName: { type: Type.STRING },
            atk: { type: Type.INTEGER },
            def: { type: Type.INTEGER },
            suggestedLog: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

/**
 * Generates a witty acquisition title/method string based on input parameters.
 */
export const generateAcquisitionLog = async (signingCount: number, sessionName: string) => {
   try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create a short, dry, system-log style sentence in Korean for a game UI.
        Context: A player obtained a card.
        Details: Session "${sessionName}", Signing attempt #${signingCount}.
        Format: "HH:MM:SS, [Description]" (Only return the description part).
        Example: "세션 첫번째 Signing으로 획득"
        `
    });
    return response.text.trim();
   } catch (e) {
       return `${sessionName} ${signingCount}번째 Signing으로 획득`;
   }
}