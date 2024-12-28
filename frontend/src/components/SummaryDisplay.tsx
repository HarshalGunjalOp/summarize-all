import React from 'react'
import {Card} from '@/components/ui/card' // Importing shadcn's Card component
import { marked } from 'marked'
import DOMPurify from 'dompurify'

interface SummaryDisplayProps {
  summary: string
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  if (!summary) return null

  const getMarkdownText = () => {
    const rawMarkup = marked.parse(summary,{ async: false })
    const cleanMarkup = DOMPurify.sanitize(rawMarkup)
    return { __html: cleanMarkup }
  }

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Summary:</h2>
      <div
        className="prose"
        dangerouslySetInnerHTML={getMarkdownText()}
      />
    </Card>
  )
}

export default SummaryDisplay

