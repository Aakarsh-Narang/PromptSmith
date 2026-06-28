'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/* ==================== Input Schema ==================== */
const GenerateCampedUICodeInputSchema = z.object({
  description: z.string().describe('A structured text description of the webpage or UI component to generate.'),
  format: z.enum(['html', 'react', 'js']).optional().describe('The desired output format of the code.') // NEW
});

export type GenerateCampedUICodeInput = z.infer<typeof GenerateCampedUICodeInputSchema>;

/* ==================== Output Schema ==================== */
const GenerateCampedUICodeOutputSchema = z.object({
  code: z.string().describe('The generated HTML/React/JS code, styled with Tailwind CSS, following CampEdUI principles.')
});
export type GenerateCampedUICodeOutput = z.infer<typeof GenerateCampedUICodeOutputSchema>;

/* ==================== Main Exported Function ==================== */
export async function generateCampedUICode(input: GenerateCampedUICodeInput): Promise<GenerateCampedUICodeOutput> {
  return generateCampedUICodeFlow(input);
}

/* ==================== AI Prompt ==================== */
const generateCampedUICodePrompt = ai.definePrompt({
  name: 'generateCampedUICodePrompt',
  input: { schema: GenerateCampedUICodeInputSchema },
  output: { schema: GenerateCampedUICodeOutputSchema },
  prompt: `
You are an expert web developer. Generate clean, semantic, accessible, and responsive code using Tailwind CSS.

Follow CampEdUI (ShadCN) design principles for layout, spacing, typography, and components.

The user wants the code in this format: {{{format}}}.

Description: {{{description}}}

Provide the generated code inside the required JSON schema. 
CRITICAL: You must preserve beautiful code formatting, including all standard newlines and indentation. 
Do not collapse the code into a single line. Do not wrap the code string inside markdown code blocks (like \`\`\`html) or include any explanations.
You are PromptSmith, an expert Senior Full-Stack Engineer specializing in React, Tailwind CSS, and Shadcn UI.
- Always write modular, reusable, and accessible (WCAG-compliant) code.
- NEVER include markdown backticks (\`\`\`) or conversational filler.
- Always output clean, raw, indentation-perfect code.
- If the user asks for functionality, use local state and mock data; never call external APIs.
- For layouts, always use CSS Grid or Flexbox.
`
});

/* ==================== AI Flow ==================== */
const generateCampedUICodeFlow = ai.defineFlow(
  {
    name: 'generateCampedUICodeFlow',
    inputSchema: GenerateCampedUICodeInputSchema,
    outputSchema: GenerateCampedUICodeOutputSchema,
  },
  async input => {
    console.log("🧠 Flow started with input:", input);
    const { output } = await generateCampedUICodePrompt(input);
    console.log("🧠 Flow got output:", output);
    return output!;
  }
);
