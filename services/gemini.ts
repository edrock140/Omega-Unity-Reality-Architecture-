
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const editLogo = async (base64Image: string, prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("ENERGY_VOID: Substrate requires API_KEY to instantiate.");
  }

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
            CRITICAL SPECIFICATIONS:
            1. The word "EVOLVE" must be filled with PURE RED (Hex: #FF0000).
            2. A stylized window structure must be integrated geometrically between the "Evolve" text and the secondary structure.
            3. The window must also use PURE RED (#FF0000).
            4. Maintain sharp, high-contrast architectural precision. No gradients on these specific elements; keep them solid and authoritative.`,
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
      throw new Error("MANIFESTATION_VOID: Model failed to render the glyph.");
    }

    return imageUrl;
  } catch (error: any) {
    console.error("OMEGA_CRITICAL_FAIL:", error);
    throw new Error(error.message || "SUBSTRATE_INTERRUPTION");
  }
};
