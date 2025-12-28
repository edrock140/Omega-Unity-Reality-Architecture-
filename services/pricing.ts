
import { GoogleGenAI, Type } from "@google/genai";

export interface MarketPrice {
  amount: number;
  currency: 'ZMW';
  complexity: string;
}

export const calculateMarketPrice = async (prompt: string): Promise<MarketPrice> => {
  // Initialize right before call to ensure up-to-date environment variables and prevent top-level crashes
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following architectural manifestation request and determine a fair price in Zambian Kwacha (ZMW) based on complexity, detail, and compute power required. 
    Request: "${prompt}"
    Return a JSON object with 'amount' (number between 10 and 500), 'complexity' (Low/Medium/High), and 'currency' ("ZMW").`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          amount: { type: Type.NUMBER },
          complexity: { type: Type.STRING },
          currency: { type: Type.STRING }
        },
        required: ["amount", "complexity", "currency"]
      }
    }
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text) as MarketPrice;
  } catch {
    return { amount: 50, currency: 'ZMW', complexity: 'Standard' };
  }
};
