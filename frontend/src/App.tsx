import React, { useState } from 'react'
import Header from './components/Header'
import SummaryForm from './components/SummaryForm'
import SummaryDisplay from './components/SummaryDisplay'

const App: React.FC = () => {
  const [summary, setSummary] = useState<string>('')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 w-full alighn-center"> 
        <SummaryForm onSummary={setSummary} />
        <SummaryDisplay summary={summary} />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Website Summarizer
      </footer>
    </div>
  )
}

export default App
