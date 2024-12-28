import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Website Summarizer</h1>
        {/* Add navigation links or buttons if necessary */}
      </div>
    </header>
  )
}

export default Header
