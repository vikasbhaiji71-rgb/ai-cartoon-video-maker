
import { GoogleGenAI, Type } from "@google/genai";
import { Scene, Character } from "../types";

const API_KEY = process.env.API_KEY || '';

export const generateStoryScenes = async (script: string, character?: Character): Promise<Scene[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const characterContext = character 
    ? `The main character is ${character.name}: ${character.description}. Ensure this character is consistent across all scenes.`
    : "Create a consistent main character for this story.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Break down the following story into 4-6 short, descriptive 2D cartoon scenes. 
    ${characterContext}
    For each scene, provide:
    1. Dialogue (Hindi)
    2. A detailed visual prompt for an image generator. 
    The style MUST be vibrant flat 2D cartoon animation, kids friendly, 9:16 aspect ratio focus.
    
    Story: ${script}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            sceneNumber: { type: Type.NUMBER },
            dialogue: { type: Type.STRING },
            visualDescription: { type: Type.STRING, description: 'Detailed prompt including character appearance and action' }
          },
          required: ["sceneNumber", "dialogue", "visualDescription"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Failed to parse scenes:", error);
    throw new Error("Could not parse story scenes.");
  }
};

export const generateSceneImage = async (prompt: string, character?: Character): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const stylePrefix = "Vibrant 2D cartoon illustration, flat colors, clean lines, simple background, kids animation style, 9:16 vertical format. ";
  const characterCore = character ? `${character.description}. ` : "";
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `${stylePrefix}${characterCore}${prompt}`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "9:16",
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Image generation failed.");
};
