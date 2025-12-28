
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface MarketPrice {
  amount: number;
  currency: 'ZMW';
  complexity: string;
}

export const calculateMarketPrice = async (prompt: string): Promise<MarketPrice> => {
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
    return JSON.parse(response.text) as MarketPrice;
  } catch {
    return { amount: 50, currency: 'ZMW', complexity: 'Standard' };
  }
};
