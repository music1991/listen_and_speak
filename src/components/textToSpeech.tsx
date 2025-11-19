import { useState } from "react";

export default function TextToSpeechApp() {
  const [text, setText] = useState("");

  const speak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🗣️ Text to Speech App</h1>
      <textarea
        className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={speak}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Speak
      </button>
    </div>
  );
}
