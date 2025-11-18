import { GoogleGenAI } from "@google/genai";
import type { RecipeOptions } from '../types';

// Lazily initialize the AI client to prevent module-level errors
// if the API key is not available, which would crash the app on load.
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
    if (!ai) {
        // This check ensures a more graceful failure if the API key is missing.
        // The error will be caught by the calling function's try-catch block in the UI.
        if (!process.env.API_KEY) {
            throw new Error("API key is not configured. Please set the API_KEY environment variable.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}


export const identifyIngredientsFromImage = async (base64ImageData: string): Promise<string> => {
  try {
    const genAI = getAiClient();
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64ImageData,
            },
          },
          {
            text: 'From this image, identify all visible food ingredients. List them as a single comma-separated string, without any other text or introduction. For example: tomatoes, onions, cheese, bread.'
          }
        ]
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error identifying ingredients:", error);
    throw new Error("Failed to identify ingredients from the image.");
  }
};

export const generateRecipe = async (ingredients: string, options: RecipeOptions): Promise<string> => {
    const prompt = `
You are The Fridge Fusion Chef AI, a world-class chef who turns random ingredients into delicious, gourmet-style recipes.

Your response MUST follow this exact structure, using the specified markers. Do not add any other text outside these markers.

_START_INGREDIENT_SUMMARY_
[A brief, one-sentence summary of the dish you'll create from the user's ingredients.]
_END_INGREDIENT_SUMMARY_

_START_RECIPE_NAME_
[A creative, gourmet-style name for the dish.]
_END_RECIPE_NAME_

_START_SERVING_SIZE_
[e.g., Serves 2]
_END_SERVING_SIZE_

_START_TOTAL_TIME_
[e.g., 30 minutes]
_END_TOTAL_TIME_

_START_INGREDIENTS_
[List all ingredients with quantities, one per line. Start each line with '- '. e.g., - 1 cup cherry tomatoes]
_END_INGREDIENTS_

_START_INSTRUCTIONS_
[Provide clear, simple, numbered steps, one per line. Start each line with the number and a period. e.g., 1. Dice the onions.]
_END_INSTRUCTIONS_

---
HERE IS THE USER'S REQUEST:

Available Ingredients: ${ingredients}
Dietary Choice: ${options.dietaryPreference}
Time Available: ${options.cookingTime}
Cooking Skill Level: ${options.skillLevel}

---
RULES:
- The recipe must sound gourmet, exciting, and unique.
- It must be practical (no unrealistic extra ingredients). Only use absolute basics like oil, salt, basic spices if not listed.
- Keep the tone friendly and confident.
- Do not ask questions. Generate the recipe directly based on the provided info.
- Fill every section within the markers. Do not leave any section blank.
`;

  try {
    const genAI = getAiClient();
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate a recipe.");
  }
};
