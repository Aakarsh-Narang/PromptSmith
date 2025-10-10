"use client";

import { Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
    interface Window {
      SpeechRecognition: any;
      webkitSpeechRecognition: any;
    }
  }

  

interface VoicePromptButtonProps {
  onTranscription: (spokenPrompt: string) => void;
}

export function VoicePromptButton({ onTranscription }: VoicePromptButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }
  }, []);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        onTranscription(transcript);
      };
      

    recognition.onerror = (event: any) => {
      console.error("Voice input error:", event.error);
      setError("Speech recognition failed. Try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        onClick={handleVoiceInput}
        className="flex items-center gap-2"
        disabled={isListening}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        {isListening ? "Listening..." : "Speak Prompt"}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
