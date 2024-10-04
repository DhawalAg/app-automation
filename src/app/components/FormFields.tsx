import React from 'react'
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"

interface FormData {
  roleName: string
  roleLink: string
  companyName: string
  companyJobBoardLink: string
  resumeType: string
  jobDescription: string
}

interface FormFieldsProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const resumeTypes: string[] = ['AI', 'General', 'Healthcare', 'Other']

const FormFields: React.FC<FormFieldsProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, resumeType: value }))
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="roleName">Role Name</Label>
          <Input
            id="roleName"
            name="roleName"
            value={formData.roleName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roleLink">Role Link</Label>
          <Input
            id="roleLink"
            name="roleLink"
            value={formData.roleLink}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyJobBoardLink">Company Job Board Link</Label>
          <Input
            id="companyJobBoardLink"
            name="companyJobBoardLink"
            value={formData.companyJobBoardLink}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="resumeType">Resume Type</Label>
        <Select onValueChange={handleSelectChange} value={formData.resumeType}>
          <SelectTrigger>
            <SelectValue placeholder="Select resume type" />
          </SelectTrigger>
          <SelectContent>
            {resumeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
          required
          className="min-h-[100px]"
        />
      </div>
    </>
  )
}

export default FormFields