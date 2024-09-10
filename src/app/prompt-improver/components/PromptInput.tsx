import React from 'react'
import { Textarea } from "components/ui/textarea"

interface PromptInputProps {
  input: string;
  setInput: (input: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ input, setInput }) => {
  return (
    <Textarea
      placeholder="Enter your prompt here (Markdown supported)..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      rows={10}
      className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
    />
  )
}

export default PromptInput