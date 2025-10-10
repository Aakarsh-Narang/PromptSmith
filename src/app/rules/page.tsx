"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { FirestoreRulesGenerator } from "@/components/forms/FirestoreRulesGenerator";

// Dynamically load CodeMirror
const CodeEditor = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });
import { javascript } from "@codemirror/lang-javascript";

export default function RulesPage() {
  const [rulesCode, setRulesCode] = useState(`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /users/{userId} {\n      allow read, write: if request.auth.uid == userId;\n    }\n  }\n}`);
  const [testRequest, setTestRequest] = useState(`{ "auth": { "uid": "user123" } }`);
  const [simResult, setSimResult] = useState<string | null>(null);

  const handleTestSimulation = () => {
    if (rulesCode.includes("request.auth.uid == userId") && testRequest.includes("user123")) {
      setSimResult("Access Allowed");
    } else {
      setSimResult("Access Denied");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Firestore Rules Generator</h1>
        <FirestoreRulesGenerator />

        {/* 🔥 Playground Section */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="material-icons text-base align-middle">terminal</span>
            Firestore Rules Playground
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Write custom Firestore rules and simulate simple requests.
          </p>

          {/* Rules Editor */}
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">Your Firestore Rules:</label>
            <CodeEditor
              value={rulesCode}
              height="300px"
              extensions={[javascript()]}
              onChange={(val) => setRulesCode(val)}
              theme="dark"
            />
          </div>

          {/* Request Simulator */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-sm">Simulate a Request (JSON):</label>
            <textarea
              value={testRequest}
              onChange={(e) => setTestRequest(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-sm font-mono bg-muted/30"
              rows={4}
            />
          </div>

          <button
            onClick={handleTestSimulation}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2"
          >
            <span className="material-icons text-sm">play_arrow</span>
            Run Simulation
          </button>

          {simResult && (
            <div className="mt-4 text-sm font-medium text-foreground flex items-center gap-2">
              <span className="material-icons text-sm">
                {simResult === "Access Allowed" ? "check_circle" : "cancel"}
              </span>
              Result: {simResult}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
