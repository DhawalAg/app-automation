'use client'

import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Apply B****</h1>
      </div>
    </header>
  )
}

// ----- with Sidebar -----

// interface HeaderProps {
//   isSidebarOpen: boolean
//   setIsSidebarOpen: (isOpen: boolean) => void
// }

// const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   return (
//     <header className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Job Application Automation</h1>
//         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//           {isSidebarOpen ? 'Close' : 'Open'} Sidebar
//         </button>
//       </div>
//     </header>
//   )
// }

export default Header