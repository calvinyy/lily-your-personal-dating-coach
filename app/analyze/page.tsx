"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Type, Loader2 } from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [method, setMethod] = useState<"screenshot" | "text" | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    // TODO: API call to analyze
    router.push("/analysis-result");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Analyze Conversation</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {!method ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              How would you like to share the conversation?
            </h2>

            <button
              onClick={() => setMethod("screenshot")}
              className="w-full bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-rose-300 transition text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Upload Screenshot</h3>
                  <p className="text-sm text-gray-600">
                    Take a screenshot and upload it
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMethod("text")}
              className="w-full bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-rose-300 transition text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
                  <Type className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Paste Text</h3>
                  <p className="text-sm text-gray-600">Copy and paste the conversation</p>
                </div>
              </div>
            </button>
          </div>
        ) : method === "text" ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste the conversation
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Copy and paste the chat here..."
              className="w-full h-64 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setMethod(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
              <button
                onClick={handleTextSubmit}
                disabled={!text.trim() || loading}
                className="flex-1 bg-rose-500 text-white py-3 rounded-full font-semibold hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Conversation"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-rose-300 transition">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your screenshot here
              </p>
              <p className="text-sm text-gray-400">or click to browse</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setMethod(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
