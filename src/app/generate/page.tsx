"use client";

import { useEffect, useState } from 'react';
import { Header } from "@/components/layout/Header";
import { PromptInputForm } from "@/components/forms/PromptInputForm";
import { CodeDisplay } from "@/components/display/CodeDisplay";
import { ExamplePrompts } from "@/components/content/ExamplePrompts";
import { Card, CardContent } from "@/components/ui/card";
import { regenerateCodeWithPrompt, type GenerateCodeFormState } from '@/app/actions';
// GemForge_lite/src/app/actions/generateCodeAction.ts
import { generateCampedUICode, type GenerateCampedUICodeInput } 
  from '../../ai/flows/generate-camped-ui-code';

export async function generateCodeAction(input: GenerateCampedUICodeInput) {
  return await generateCampedUICode(input);
}
import { useToast } from "@/hooks/use-toast";
import { VoicePromptButton } from "@/components/forms/VoicePromptButton";

export default function Home() {
  const [selectedFormat, setSelectedFormat] = useState<"html" | "react" | "js">("html");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [lastSuccessfulPrompt, setLastSuccessfulPrompt] = useState<string>("");
  const { toast } = useToast();

  const handleCodeGenerated = (code: string | null) => {
    setGeneratedCode(code);
  };

  const handleSuccessfulGeneration = (prompt: string) => {
    setLastSuccessfulPrompt(prompt);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handlePromptSelect = (prompt: string) => {
    setCurrentPrompt(prompt);
    setLastSuccessfulPrompt("");
    setGeneratedCode(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==================== Generate AI Code ==================== */
  const handleGenerateCode = async () => {
    if (!currentPrompt) {
      toast({ title: "Enter a prompt first", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setGeneratedCode(null);

    try {
      const input: GenerateCampedUICodeInput = {
        description: currentPrompt,
        format: selectedFormat
      };

      const result = await generateCampedUICode(input);
      setGeneratedCode(result.code);
      handleSuccessfulGeneration(currentPrompt);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ==================== Regenerate Code ==================== */
  const handleRegenerate = async () => {
    if (!lastSuccessfulPrompt) {
      toast({
        title: "Cannot Regenerate",
        description: "There is no previous successful prompt to regenerate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedCode(null);

    try {
      const input: GenerateCampedUICodeInput = {
        description: lastSuccessfulPrompt,
        format: selectedFormat
      };

      const result = await generateCampedUICode(input);
      setGeneratedCode(result.code);
      toast({ title: "Code Regenerated!" });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to regenerate code", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-pink-50 p-12 md:p-20 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-800">
          Welcome to PromptSmith
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Transform your ideas into code instantly. Choose a format, speak or type your prompt, and see magic happen.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as "html" | "react" | "js")}
            className="border border-indigo-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="html">HTML</option>
            <option value="react">React (JSX)</option>
            <option value="js">JavaScript (DOM)</option>
          </select>

          <VoicePromptButton onTranscription={(spoken) => {
            setCurrentPrompt(spoken);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} />
        </div>
      </section>

      {/* Main Grid */}
      <main className="flex-grow container mx-auto p-6 md:p-12 -mt-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Prompt & Examples */}
          <Card className="shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform duration-300">
            <CardContent className="p-8">
              <PromptInputForm 
                onCodeGenerated={handleCodeGenerated}
                onLoadingChange={handleLoadingChange}
                initialPrompt={currentPrompt}
                onSuccessfulGeneration={handleSuccessfulGeneration}
                selectedFormat={selectedFormat}
              />

              {/* Buttons Row */}
              <div className="flex justify-between mt-4 mb-6">
                <button
                  onClick={() => setCurrentPrompt("")}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-100 transition"
                >
                  Clear
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-lg text-indigo-700 mb-3">Example Prompts</h3>
                <ExamplePrompts onPromptSelect={handlePromptSelect} />
              </div>
            </CardContent>
          </Card>

          {/* Generated Code */}
          <Card className="shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform duration-300 flex flex-col">
            <CardContent className="p-8 flex flex-col h-full">
              <CodeDisplay 
                generatedCode={generatedCode} 
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
                canRegenerate={!!lastSuccessfulPrompt}
              />
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} PromptSmith. Powered by Gemini.
      </footer>
    </div>
  );
}
