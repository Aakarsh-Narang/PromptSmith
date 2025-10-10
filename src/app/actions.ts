
"use server";

import { generateCampedUICode, type GenerateCampedUICodeInput } from '@/ai/flows/generate-camped-ui-code';
import { z } from 'zod';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { generateFirestoreRulesFlow } from "@/ai/flows/generate-firestore-rules";

const GenerateCodeSchema = z.object({
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters long." }),
  format: z.enum(['html', 'react', 'js']),
});

export async function generateFirestoreRules(description: string): Promise<string> {
  const result = await generateFirestoreRulesFlow({ description });
  return result.rules;
}

export interface GenerateCodeFormState {
  message: string | null;
  generatedCode: string | null;
  success: boolean;
  promptUsed?: string | null;
}

export async function generateCodeAction(
  prevState: GenerateCodeFormState,
  formData: FormData
): Promise<GenerateCodeFormState> {
  const promptValue = formData.get('prompt');
  const formatValue = formData.get('format');
  const validatedFields = GenerateCodeSchema.safeParse({
    prompt: promptValue,
    format: formatValue,
  });
  

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.prompt?.[0] ?? "Invalid prompt.",
      generatedCode: null,
      success: false,
      promptUsed: typeof promptValue === 'string' ? promptValue : null,
    };
  }

  const input: GenerateCampedUICodeInput = {
    description: validatedFields.data.prompt,
    format: validatedFields.data.format,
  };
  

  try {
    const result = await generateCampedUICode(input);
    if (result && result.code) {
      await addDoc(collection(db, "promptHistory"), {
        prompt: input.description,
        format: input.format,
        generatedCode: result.code,
        timestamp: serverTimestamp(),
      });
      return {
        message: "Code generated successfully!",
        generatedCode: result.code,
        success: true,
        promptUsed: validatedFields.data.prompt,
      };
    } else {
      return {
        message: "Failed to generate code. The AI returned an empty response.",
        generatedCode: null,
        success: false,
        promptUsed: validatedFields.data.prompt,
      };
    }
  } catch (error) {
    console.error("Error generating code:", error);
    return {
      message: "An unexpected error occurred while generating code. Please try again.",
      generatedCode: null,
      success: false,
      promptUsed: validatedFields.data.prompt,
    };
  }
}

export async function regenerateCodeWithPrompt(prompt: string, format: "html" | "react" | "js"): Promise<GenerateCodeFormState> {
  const validatedFields = GenerateCodeSchema.safeParse({ prompt, format });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.prompt?.[0] ?? "Invalid prompt.",
      generatedCode: null,
      success: false,
      promptUsed: prompt,
    };
  }

  const input: GenerateCampedUICodeInput = {
    description: validatedFields.data.prompt,
    format: validatedFields.data.format,
  };

  try {
    const result = await generateCampedUICode(input);
    if (result && result.code) {
      return {
        message: "Code regenerated successfully!",
        generatedCode: result.code,
        success: true,
        promptUsed: validatedFields.data.prompt,
      };
    } else {
      return {
        message: "Failed to regenerate code. The AI returned an empty response.",
        generatedCode: null,
        success: false,
        promptUsed: validatedFields.data.prompt,
      };
    }
  } catch (error) {
    console.error("Error regenerating code:", error);
    return {
      message: "An unexpected error occurred while regenerating code. Please try again.",
      generatedCode: null,
      success: false,
      promptUsed: prompt,
    };
  }
}

