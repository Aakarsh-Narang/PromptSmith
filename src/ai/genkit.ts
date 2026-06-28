import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
   plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY, 
    }),
  ],
  // model: 'googleai/gemini-2.0-flash',  --> This model has been dicontinued
  model: 'googleai/gemini-3.5-flash',
});
