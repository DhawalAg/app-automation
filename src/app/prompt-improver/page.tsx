import React from 'react'
import PromptImproverClient from './client'

const PromptImprover: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PromptImproverClient />
    </div>
  )
}

export default PromptImprover