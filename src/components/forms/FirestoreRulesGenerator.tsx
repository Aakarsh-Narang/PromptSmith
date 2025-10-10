"use client";

import { useState } from "react";
import { generateFirestoreRules } from "@/app/actions"; // 🔁 make sure this exists
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function FirestoreRulesGenerator() {
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setRules(null);
    try {
      const result = await generateFirestoreRules(description);
      setRules(result);
    } catch (err) {
      console.error("Error generating rules:", err);
      setError("Failed to generate rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-muted/40 mt-8">
      <h2 className="text-lg font-semibold mb-4">Generate Firestore Rules with AI</h2>

      <Textarea
        placeholder="e.g., Only logged-in users can read and write their own documents."
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />

      <Button onClick={handleGenerate} disabled={loading || !description.trim()}>
        {loading ? "Generating..." : "Generate Rules"}
      </Button>

      {rules && (
        <Alert variant="default" className="mt-4 bg-background border text-foreground">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Generated Rules</AlertTitle>
          <AlertDescription>
            <pre className="text-xs whitespace-pre-wrap mt-2">{rules}</pre>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
