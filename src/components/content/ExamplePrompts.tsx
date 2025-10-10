"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const examplePromptsList = [
  {
    id: "1",
    title: "GitHub Repository Fetcher",
    description: "Build a simple web app that takes a GitHub repository URL as input and displays its files and content as readable text. The app should show the repo name, file list, and let users click files to view their code. Use a clean, minimal UI."
    },
  {
    id: "2",
    title: "Calculator App",
    description: "Make a calculator web app for basic arithmetic operations with a clean layout and responsive buttons."
  },
   {
    id: "3",
    title: "Weather App",
    description: "Create a simple weather app that shows current temperature and forecast for a city."
  },
  {
    id: "4",
    title: "Login Form",
    description: "Create a responsive login form with animated input fields, a submit button with hover effects, and error validation messages.It should have a circular avatar (placeholder image 100x100 pixels)"
  },
  {
    id: "5",
    title: "Simple Navigation Bar",
    description: "A simple navigation bar. It should have a logo text 'CampEdUI' on the left. On the right, include three navigation links: 'Home', 'Features', and 'Pricing'."
  },

  
];

interface ExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export function ExamplePrompts({ onPromptSelect }: ExamplePromptsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 font-headline text-primary flex items-center">
        <Lightbulb className="mr-2 h-5 w-5 text-accent" />
        Example Prompts
      </h2>
      <div className="space-y-4">
        {examplePromptsList.map((prompt) => (
          <Card key={prompt.id} className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-headline">{prompt.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{prompt.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onPromptSelect(prompt.description)}
                className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Use this prompt
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
