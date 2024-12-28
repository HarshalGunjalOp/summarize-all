import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

interface SummaryFormProps {
  onSummary: (summary: string) => void
}

const SummaryForm: React.FC<SummaryFormProps> = ({ onSummary }) => {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [length, setLength] = useState<string>('3')
  const [summaryStyle, setSummaryStyle] = useState<string>('single_paragraph')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!url && !text) {
      setError('Please provide either a URL or some text.')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('/summarize', {
        url: url || null,
        text: text || null,
        length: Number(length),
        summary_style: summaryStyle,
      })

      onSummary(response.data.summary)
    } catch (err) {
		if (axios.isAxiosError(err)) {
			setError(err.response?.data?.error || 'An error occurred.')
		  } else {
			setError('An unexpected error occurred.')
		  }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-5">
      <div className='rounded-md'>
        <Label htmlFor="url" className='text-sm mb-1'>Website URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={text !== ''}
          className="input-bordered"
        />
      </div>

      <div>
        <Label htmlFor="text" className='text-sm mb-1'>Or Enter Text</Label>
        <Textarea
          rows={5}
          id="text"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={url !== ''}
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="length" className='text-sm mb-1'>Summary Length</Label>
          <Select value={length} onValueChange={(value) => setLength(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent className='bg-white border-sm border-black'>
              <SelectItem value="1">Short</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Label htmlFor="style" className='text-sm mb-1'>Summary Style</Label>
          <Select value={summaryStyle} onValueChange={(value) => setSummaryStyle(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className='bg-white border-sm border-black'>
              <SelectItem value="single_paragraph">Single Paragraph</SelectItem>
              <SelectItem value="bullet_points">Bullet Points</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <Button type="submit" disabled={loading} className="w-full bg-gray-800 text-white hover:bg-gray-700">
        {loading ? <Loader2 className="animate-spin mr-2" /> : 'Summarize'}
      </Button>
    </form>
  )
}

export default SummaryForm
