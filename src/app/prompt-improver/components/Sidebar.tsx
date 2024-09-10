import React from 'react'
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"

interface Conversation {
  id: number;
  title: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredConversations: Conversation[];
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, searchTerm, setSearchTerm, filteredConversations }) => {
  return (
    <aside className={`w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-16 bottom-0 z-10 overflow-y-auto`}>
      <nav className="p-4">
        <h2 className="text-lg font-semibold mb-4">Previous Conversations</h2>
        <Input
          type="search"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <ul className="space-y-2">
          {filteredConversations.map((conversation) => (
            <li key={conversation.id}>
              <Button variant="ghost" className="w-full justify-start text-left">
                {conversation.title}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar