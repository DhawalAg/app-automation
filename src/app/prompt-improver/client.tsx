'use client'

import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PromptInput from './components/PromptInput'
import ImproveButton from './components/ImproveButton'
import OutputDisplay from './components/OutputDisplay'

interface Conversation {
  id: number;
  title: string;
}

const exampleConversations: Conversation[] = [
  { id: 1, title: "Improve essay prompt" },
  { id: 2, title: "Refine product description" },
  { id: 3, title: "Enhance coding question" },
  { id: 4, title: "Optimize research query" },
  { id: 5, title: "Clarify interview questions" },
  { id: 6, title: "Improve survey design" },
  { id: 7, title: "Enhance story outline" },
  { id: 8, title: "Refine business proposal" },
]

const PromptImproverClient: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const improvePrompt = async () => {
    setIsLoading(true)
    // Simulating an API call to an LLM
    await new Promise(resolve => setTimeout(resolve, 1500))
    const improvedPrompt = `# Improved version of your prompt:

${input}

1. **Be more specific** about [key aspect].
2. Consider adding context about [relevant information].
3. *Clarify* the desired output format.
4. Include any constraints or limitations.
5. Ask for step-by-step explanations if applicable.`
    
    setOutput(improvedPrompt)
    setIsLoading(false)
  }

  const filteredConversations = exampleConversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-grow flex">
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          filteredConversations={filteredConversations}
        />
        <main className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="space-y-4">
              <PromptInput input={input} setInput={setInput} />
              <ImproveButton onClick={improvePrompt} isLoading={isLoading} disabled={isLoading || input.trim() === ''} />
              {output && <OutputDisplay output={output} />}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default PromptImproverClient