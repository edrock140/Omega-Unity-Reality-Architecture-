
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const editLogo = async (base64Image: string, prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("ENERGY_VOID: Substrate requires API_KEY to instantiate.");
  }

  // Create instance right before call as per rules
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const match = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  if (!match) {
    throw new Error("MALFORMED_INPUT: Base64 error.");
  }
  const mimeType = match[1];
  const data = match[2];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: data,
              mimeType: mimeType,
            },
          },
          {
            text: `ACT AS THE OMEGA ARCHITECT. EXECUTE SOVEREIGN DIRECTIVE: ${prompt}. 
            CRITICAL GEOMETRIC SPECIFICATIONS:
            1. The word "EVOLVE" must be filled with PURE RADIANT RED (Hex: #FF0000). Ensure the fill is solid and dominant.
            2. MANDATORY ADDITION: Between the "EVOLVE" text and the surrounding structure, you must draw a distinct, architectural WINDOW.
            3. The WINDOW must be colored in the same PURE RED (#FF0000).
            4. The style must be high-contrast, clean, and authoritative. Avoid gradients or shadows; prioritize raw architectural manifestation. 
            5. Final output must look like a high-end reality blueprint where the color red represents power and evolution.`,
          },
        ],
      },
    });

    let imageUrl: string | null = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("MANIFESTATION_VOID: Model failed to render the glyph. Possible censorship or complexity error.");
    }

    return imageUrl;
  } catch (error: any) {
    console.error("OMEGA_CRITICAL_FAIL:", error);
    throw new Error(error.message || "SUBSTRATE_INTERRUPTION");
  }
};
