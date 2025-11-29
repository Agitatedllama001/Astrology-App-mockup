import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserData, ReadingType, ReadingData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema Definitions
const astrologySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sunSign: { type: Type.STRING },
    moonSign: { type: Type.STRING },
    luckyColor: { type: Type.STRING },
    luckyNumber: { type: Type.STRING },
    compatibleSigns: { type: Type.ARRAY, items: { type: Type.STRING } },
    luckyGemstone: { type: Type.STRING },
    summary: { type: Type.STRING },
  },
  required: ['sunSign', 'moonSign', 'luckyColor', 'luckyNumber', 'compatibleSigns', 'luckyGemstone', 'summary'],
};

const vedicSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    lagna: { type: Type.STRING },
    moonSign: { type: Type.STRING },
    ascendant: { type: Type.STRING },
    currentDasha: { type: Type.STRING },
    pastDasha: { type: Type.STRING },
    futureDasha: { type: Type.STRING },
    luckyColor: { type: Type.STRING },
    luckyNumber: { type: Type.STRING },
    compatibleSigns: { type: Type.ARRAY, items: { type: Type.STRING } },
    luckyGemstone: { type: Type.STRING },
    doshas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          remedy: { type: Type.STRING },
        },
        required: ['name', 'description', 'remedy'],
      },
    },
    summary: { type: Type.STRING },
  },
  required: ['lagna', 'moonSign', 'ascendant', 'currentDasha', 'pastDasha', 'futureDasha', 'luckyColor', 'luckyNumber', 'compatibleSigns', 'luckyGemstone', 'doshas', 'summary'],
};

const tarotSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    cards: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          meaning: { type: Type.STRING },
        },
        required: ['name', 'description', 'meaning'],
      },
    },
    summary: { type: Type.STRING },
  },
  required: ['cards', 'summary'],
};

const numerologySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    lifePathNumber: { type: Type.STRING },
    destinyNumber: { type: Type.STRING },
    summary: { type: Type.STRING },
  },
  required: ['lifePathNumber', 'destinyNumber', 'summary'],
};

const chineseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    zodiacAnimal: { type: Type.STRING },
    element: { type: Type.STRING },
    yearOutlook: { type: Type.STRING },
    summary: { type: Type.STRING },
  },
  required: ['zodiacAnimal', 'element', 'yearOutlook', 'summary'],
};

export const generateReading = async (
  user: UserData, 
  type: ReadingType, 
  extraContext?: string
): Promise<ReadingData> => {
  const modelId = 'gemini-2.5-flash';
  
  const systemInstruction = `You are a mystical, wise, and benevolent oracle. 
  You provide deep, insightful, and positive readings. 
  Your tone should be ethereal, empowering, and slightly poetic.
  Avoid negative predictions; focus on growth and guidance.
  Return the result in JSON format matching the requested schema.`;

  let prompt = `
    User Details:
    - Name: ${user.name}
    - Date of Birth: ${user.dob}
    - Place of Birth: ${user.birthPlace}
  `;

  let schema: Schema | undefined;

  switch (type) {
    case ReadingType.Astrology:
      prompt += `\nProvide a Western Astrology reading. 
      Include Sun sign, Moon sign, lucky color, lucky number, compatible signs, lucky gemstone, and a summary.`;
      schema = astrologySchema;
      break;
    case ReadingType.Vedic:
      prompt += `\nProvide a Vedic Astrology reading.
      Include Lagna, Moon sign (Rashi), Ascendant, Current/Past/Future Dasha (simulate simplified periods),
      lucky color, lucky number, compatible signs, lucky gemstone.
      Identify potential Doshas (like Manglik, Kaal Sarpa, Sade Sati) - if none significant, mention general minor ones or say 'None significant', 
      provide their descriptions and simple remedies.`;
      schema = vedicSchema;
      break;
    case ReadingType.Tarot:
      prompt += `\nPerform a 3-card Tarot reading.
      User Question/Context: "${extraContext}"
      Simulate a 3-card spread. Provide the card name, a visual description, and its meaning relevant to the question.
      Provide a final summary.`;
      schema = tarotSchema;
      break;
    case ReadingType.Numerology:
      prompt += `\nProvide a Numerology reading. Calculate Life Path Number and Destiny Number. Provide a reading summary.`;
      schema = numerologySchema;
      break;
    case ReadingType.Chinese:
      prompt += `\nProvide a Chinese Astrology reading. Identify Zodiac Animal, Element. Describe the outlook for the current year.`;
      schema = chineseSchema;
      break;
    default:
      return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Error generating reading:", error);
    throw error;
  }
};
