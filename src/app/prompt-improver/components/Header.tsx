import React from 'react'
import { Button } from "components/ui/button"
import { MenuIcon, XIcon, SearchIcon } from 'lucide-react'

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSidebarOpen(true)}>
            <SearchIcon className="h-6 w-6" />
          </Button>
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Prompt Improver</h1>
      </div>
    </header>
  )
}

export default Header