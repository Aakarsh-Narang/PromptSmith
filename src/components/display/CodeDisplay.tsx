"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  Copy,
  Download,
  RefreshCw,
  Code2,
  Eye,
  CodeXmlIcon,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDisplayProps {
  generatedCode: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
  canRegenerate: boolean;
}

export function CodeDisplay({
  generatedCode,
  isLoading,
  onRegenerate,
  canRegenerate,
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const [iframeKey, setIframeKey] = useState(0);

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard
        .writeText(generatedCode)
        .then(() => {
          setCopied(true);
          toast({
            title: "Code Copied!",
            description:
              "The generated HTML/CSS has been copied to your clipboard.",
          });
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast({
            title: "Copy Failed",
            description:
              "Could not copy code to clipboard. Please try again.",
            variant: "destructive",
          });
        });
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "promptsmith-code.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Code Downloaded!",
        description: "Your generated file has been saved.",
      });
    }
  };

  useEffect(() => {
    setCopied(false);
    setIframeKey((prev) => prev + 1);
  }, [generatedCode]);

  const iframeSrcDoc = generatedCode
    ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { padding: 1rem; margin: 0; background-color: #fff; color: #000; }
      </style>
    </head>
    <body>
      ${generatedCode}
    </body>
    </html>
  `
    : "";

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl font-semibold font-headline text-primary">
          Output
        </h2>
        {generatedCode && !isLoading && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={!canRegenerate || isLoading}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="code" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="code">
            <Code2 className="mr-2 h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        {/* =================== CODE TAB =================== */}
        <TabsContent
          value="code"
          className="flex-grow rounded-md border border-border bg-secondary/30 p-1 min-h-[200px]"
        >
          <div className="relative w-full h-full overflow-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
                <CodeXmlIcon className="w-12 h-12 animate-pulse text-primary" />
                <p className="mt-4 text-lg">Generating your code...</p>
                <p className="text-sm">Please wait a moment.</p>
              </div>
            ) : generatedCode ? (
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language="htmlbars"
                  style={atomDark}
                  customStyle={{
                    background: "transparent",
                    padding: "0.75rem",
                    margin: "0",
                    fontSize: "0.875rem",
                    overflowX: "auto",
                    whiteSpace: "pre",
                    display: "block",
                    minWidth: "100%",
                  }}
                  showLineNumbers={false}
                  wrapLongLines={false}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
                <CodeXmlIcon className="w-12 h-12 text-gray-400" />
                <p className="mt-4 text-lg">Your generated code will appear here.</p>
                <p className="text-sm">
                  Enter a prompt and click "Generate Code" to start.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* =================== PREVIEW TAB =================== */}
        <TabsContent
          value="preview"
          className="flex-grow rounded-md border border-border bg-white min-h-[200px]"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
              <Eye className="w-12 h-12 animate-pulse text-primary" />
              <p className="mt-4 text-lg">Loading preview...</p>
            </div>
          ) : generatedCode ? (
            <iframe
              key={iframeKey}
              srcDoc={iframeSrcDoc}
              title="Generated Code Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground p-4">
              <Eye className="w-12 h-12 text-gray-400" />
              <p className="mt-4 text-lg">
                Preview will appear here once code is generated.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}