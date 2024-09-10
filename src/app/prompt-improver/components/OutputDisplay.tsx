import React, { useState } from 'react'
import { Button } from "components/ui/button"
import { CopyIcon, CheckIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative mt-8">
      <div className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
        <ReactMarkdown className="prose max-w-none">
          {output}
        </ReactMarkdown>
      </div>
      <Button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
        size="sm"
      >
        {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default OutputDisplay