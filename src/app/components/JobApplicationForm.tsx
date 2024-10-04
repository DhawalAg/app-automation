'use client'

import React, { useState, FormEvent } from 'react'
import { Button } from "~/components/ui/button"
import FormFields from '~/app/components/FormFields'
import OutputDisplay from '~/app/components/OutputDisplay'

const JobApplicationForm: React.FC = () => {
    const [formData, setFormData] = useState({
      roleName: '',
      roleLink: '',
      companyName: '',
      companyJobBoardLink: '',
      resumeType: '',
      jobDescription: ''
    })
  
    const [output, setOutput] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        if (response.ok) {
          console.log('Form submitted successfully')
          const data = await response.json()
          setOutput(data.output)
        } else {
          console.error('Form submission failed')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    return (
      <div className="space-y-6 bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormFields formData={formData} setFormData={setFormData} />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        {output && <OutputDisplay output={output} />}
      </div>
    )
  }
  
  export default JobApplicationForm