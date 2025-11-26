import React, { useState, useEffect } from 'react'
import { useCourses, useChallenges, useTestCases, useAIChallenge } from '../../hooks/useApi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Wand2, Save, X } from 'lucide-react'

export default function CreateTest({ onClose }) {
  const { courses } = useCourses()
  const { createChallenge } = useChallenges()
  const { createTestCase } = useTestCases()
  const { generateIdea, generateTestCases, loading: aiLoading } = useAIChallenge()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('EASY')
  const [tags, setTags] = useState('')
  const [timeLimit, setTimeLimit] = useState(1500)
  const [memoryLimit, setMemoryLimit] = useState(256)
  const [courseId, setCourseId] = useState('')
  const [aiCategory, setAiCategory] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (courses.length > 0 && !courseId) {
      setCourseId(courses[0].id)
    }
  }, [courses, courseId])

  const handleGenerateAI = async () => {
    if (!aiCategory.trim()) {
      setMessage('Please enter a category')
      setIsError(true)
      return
    }

    setMessage('Generating challenge with AI...')
    setIsError(false)
    const ideaResult = await generateIdea(aiCategory)

    if (!ideaResult.ok) {
      setMessage(`AI Error: ${ideaResult.error}`)
      setIsError(true)
      return
    }

    const idea = ideaResult.data
    setTitle(idea.title)
    setDescription(idea.description)
    setDifficulty(idea.difficulty)
    setTags(idea.tags.join(', '))
    setTimeLimit(idea.timeLimit)
    setMemoryLimit(idea.memoryLimit)
    setMessage('AI challenge generated! Review and save.')
    setIsError(false)
  }

  const handleSave = async () => {
    if (!title || !description || !courseId) {
      setMessage('Please fill all required fields')
      setIsError(true)
      return
    }

    setMessage('Creating challenge...')
    setIsError(false)

    const challengeData = {
      title,
      description,
      difficulty,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      timeLimit: parseInt(timeLimit),
      memoryLimit: parseInt(memoryLimit),
      courseId,
    }

    const result = await createChallenge(challengeData)

    if (result.ok) {
      setMessage('Challenge created successfully!')
      setIsError(false)
      
      const testCasesResult = await generateTestCases(challengeData)
      if (testCasesResult.ok && testCasesResult.data.length > 0) {
        for (const tc of testCasesResult.data) {
          await createTestCase({
            challengeId: result.data.id,
            input: tc.input,
            output: tc.output,
            isHidden: tc.isHidden || false,
          })
        }
        setMessage('Challenge and test cases created!')
      }

      setTimeout(() => {
        if (onClose) onClose()
      }, 2000)
    } else {
      setMessage(`Error: ${result.error}`)
      setIsError(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create Challenge</h1>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {message && (
        <Alert variant={isError ? "destructive" : "default"} className={`mb-6 ${!isError ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20" : ""}`}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <Card className="border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              AI Generator
            </CardTitle>
            <CardDescription>
              Generate a challenge idea automatically using AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                value={aiCategory}
                onChange={e => setAiCategory(e.target.value)}
                placeholder="Category (e.g., Binary Trees, Dynamic Programming)"
                className="flex-1"
              />
              <Button onClick={handleGenerateAI} disabled={aiLoading}>
                {aiLoading ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
            <CardDescription>Manually configure the challenge parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Challenge Title"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Detailed description of the problem..."
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="arrays, hashmap, sorting (comma separated)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time Limit (ms)</Label>
                <Input
                  type="number"
                  value={timeLimit}
                  onChange={e => setTimeLimit(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Memory Limit (MB)</Label>
                <Input
                  type="number"
                  value={memoryLimit}
                  onChange={e => setMemoryLimit(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSave} className="min-w-[150px]">
            <Save className="mr-2 h-4 w-4" />
            Save Challenge
          </Button>
        </div>
      </div>
    </div>
  )
}
