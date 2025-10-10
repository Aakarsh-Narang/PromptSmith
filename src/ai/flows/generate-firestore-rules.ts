// src/ai/flows/generate-firestore-rules.ts
import { ai } from "@/ai/genkit";
import { z } from "genkit";

const FirestoreRuleInput = z.object({
  description: z.string()
});

const FirestoreRuleOutput = z.object({
  rules: z.string()
});

export const generateFirestoreRulesFlow = ai.defineFlow(
  {
    name: "generateFirestoreRulesFlow",
    inputSchema: FirestoreRuleInput,
    outputSchema: FirestoreRuleOutput,
  },
  async (input) => {
    const prompt = `
You are a Firebase security expert.

Based on the following natural language description, generate secure Firestore rules.

Description: "${input.description}"

Make sure to use rules_version = '2' and include allow read/write with correct conditions.
Return only the code block.
`;

const result = await ai.generate({
    model: "googleai/gemini-1.5-flash",
    prompt: prompt
  });
  

    return {
      rules: result.text ?? "// No output"
    };
  }
);
