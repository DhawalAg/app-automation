import React from 'react'
import { Button } from "components/ui/button"
import { ArrowRightIcon } from 'lucide-react'

interface ImproveButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const ImproveButton: React.FC<ImproveButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
    >
      {isLoading ? 'Improving...' : 'Improve Prompt'}
      {!isLoading && <ArrowRightIcon className="ml-2 h-4 w-4" />}
    </Button>
  )
}

export default ImproveButton