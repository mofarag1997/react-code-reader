import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("")

  const [spokenCode, setSpokenCode] = useState("")

  const codeToSpeech = (code) => {
    const replacements = {
      "{": " open curly brackets ",
      "}": " close curly brackets ",
      "(": " open parenthesis ",
      ")": " close parenthesis ",
      "[": " open square brackets ",
      "]": " close square brackets ",
      "<=": " less than or equal ",
      ">=": " greater than or equal ",
      "==": " double equals ",
      "===": " triple equals ",
      "=": " equals ",
      ";": " semicolon ",
      ":": " colon ",
      ",": " comma ",
      ".": " dot ",
      "!": " exclamation mark ",
      "+": " plus ",
      "-": " minus ",
      "*": " star ",
      "/": " slash ",
      "//": " double slash comment ",
      "/*": " open block comment ",
      "*/": " close block comment ",
      "->": " arrow ",
      "=>": " fat arrow ",
      '"': " double quote ",
      "'": " single quote "
    }

    let spoken = code;
    Object.keys(replacements)
      .sort((a, b) => b.length - a.length)
      .forEach((symbol) => {
        spoken = spoken.split(symbol).join(replacements[symbol])
      });

    return spoken
  }

  const handleApprove = () => {
    setSpokenCode(codeToSpeech(code))
  }

  const handleSpeak = () => {
    if (!spokenCode) return;
    const utterance = new SpeechSynthesisUtterance(spokenCode);
    utterance.rate = 1; 
    utterance.pitch = 2; 
    speechSynthesis.speak(utterance);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
           Code to Speech
        </h1>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 p-4 rounded-lg bg-gray-800 text-green-300 font-mono border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleApprove}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-lg font-semibold shadow-lg transition-all"
          >
            Approve
          </button>
          <button
            onClick={handleSpeak}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-lg font-semibold shadow-lg transition-all"
          >
             Speak
          </button>
        </div>

        {spokenCode && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-yellow-300">
               Processed Code:
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg text-yellow-200 font-mono border border-gray-700 whitespace-pre-wrap">
              {spokenCode}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
