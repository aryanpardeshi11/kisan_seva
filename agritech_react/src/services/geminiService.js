import { GEMINI_API_KEY } from '../config/apiConfig';

export const callGeminiApi = async (userQuery) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '' || GEMINI_API_KEY.includes('YOUR_GEMINI')) {
    return null; // Fallback to built-in agronomy engine
  }

  const systemContext = `You are Kisan Seva AI Assistant, an expert agricultural scientist and APMC Mandi specialist in India. 
You advise farmers on crop disease treatment, NPK fertilizers, soil health, crop growth, weather advisory, and PM-Kisan government schemes. 
Provide clear, practical, expert agricultural guidance in simple terms for a farmer.`;

  const promptText = `${systemContext}\n\nFarmer's Query: "${userQuery}"\n\nDetailed Agricultural Advice:`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: promptText }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
    }
  };

  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim()) {
          return candidateText.trim();
        }
      }
    } catch (err) {
      console.warn(`Gemini model ${model} fetch failed:`, err);
    }
  }

  return null;
};
