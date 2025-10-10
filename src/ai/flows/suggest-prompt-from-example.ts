'use server';
/**
 * @fileOverview Generates HTML/CSS code from a text prompt using CampEdUI components.
 *
 * - generateCodeFromPrompt - A function that takes a text prompt and returns generated HTML/CSS code.
 * - GenerateCodeFromPromptInput - The input type for the generateCodeFromPrompt function.
 * - GenerateCodeFromPromptOutput - The return type for the generateCodeFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeFromPromptInputSchema = z.object({
  prompt: z.string(),
  format: z.enum(['html', 'react', 'js'])
});

export type GenerateCodeFromPromptInput = z.infer<typeof GenerateCodeFromPromptInputSchema>;

const GenerateCodeFromPromptOutputSchema = z.object({
  code: z.string().describe('The generated HTML/CSS code using CampEdUI components.'),
});
export type GenerateCodeFromPromptOutput = z.infer<typeof GenerateCodeFromPromptOutputSchema>;

export async function generateCodeFromPrompt(input: GenerateCodeFromPromptInput): Promise<GenerateCodeFromPromptOutput> {
  return generateCodeFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeFromPromptInputSchema},
  output: {schema: GenerateCodeFromPromptOutputSchema},
  prompt: ({ prompt, format }) => {
    let instructions = "";
  
    if (format === "html") {
      instructions = `
  Generate clean and semantic HTML using Tailwind CSS. Do not include JSX, React syntax, or JavaScript. Use only pure HTML with Tailwind classes.
      `.trim();
    } else if (format === "react") {
      instructions = `
  Generate a React functional component using JSX. Use Tailwind CSS classes for styling. Use \`className\` instead of \`class\`. Return only the JSX structure, no explanations.
      `.trim();
    } else if (format === "js") {
      instructions = `
  Generate JavaScript code that uses DOM methods like \`document.createElement\` and \`.classList.add()\` to construct the UI described in the prompt. Apply Tailwind classes through \`.classList\`. Do not use HTML or JSX.
      `.trim();
    }
  
    return [
      {
        text: `
  You are an expert web developer specialized in ${format.toUpperCase()} UI generation.
  
  ${instructions}
  
  Component Description:
  "${prompt}"
  
  Use CampEdUI design principles: clean layout, accessibility, and Tailwind CSS utility classes.
  
  Return only the ${format.toUpperCase()} code. No markdown, no explanation.
        `.trim(),
      },
    ];
  }
  
});

const generateCodeFromPromptFlow = ai.defineFlow(
  {
    name: 'generateCodeFromPromptFlow',
    inputSchema: GenerateCodeFromPromptInputSchema,
    outputSchema: GenerateCodeFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
