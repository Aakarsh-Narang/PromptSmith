"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Header } from "@/components/layout/Header";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const q = query(collection(db, "promptHistory"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Prompt History</h1>
        {history.length === 0 ? (
          <p className="text-muted-foreground">No prompt history found.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="border border-border rounded p-4 bg-muted/40">
                <p className="text-sm text-muted-foreground">
                  <strong>Format:</strong> {item.format}
                </p>
                <p className="text-sm">
                  <strong>Prompt:</strong> {item.prompt}
                </p>
                <pre className="mt-2 text-xs bg-background p-2 rounded border whitespace-pre-wrap">
{item.generatedCode}
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
