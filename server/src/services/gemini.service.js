import { generateContent } from '../config/gemini.config.js';

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1500;

const isTransientError = (error) => {
  const message = error?.message || '';
  return /503|UNAVAILABLE|overloaded|429|RESOURCE_EXHAUSTED|ECONNRESET|ETIMEDOUT|abort/i.test(message);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const askGemini = async (prompt) => {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await generateContent(prompt);

      if (!response) {
        throw new Error('Gemini returned an empty response');
      }

      return response;
    } catch (error) {
      lastError = error;
      console.error(`Gemini Service Error (attempt ${attempt}/${MAX_ATTEMPTS}):`, error.message);

      if (!isTransientError(error) || attempt === MAX_ATTEMPTS) {
        break;
      }

      await delay(RETRY_DELAY_MS * attempt);
    }
  }

  console.error('Gemini Service failed:', lastError?.message);
  throw new Error('The AI service is currently unavailable. Please try again later.');
};