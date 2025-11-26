import React, { useState } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import Header from '../../components/Header'
import { useChallenges, useSubmissions } from '../../hooks/useApi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Code2, Trophy, Clock, Database } from 'lucide-react'

export default function StudentDashboard() {
  const { user } = useAuth()
  const { challenges, loading: challengesLoading } = useChallenges()
  const { submissions, loading: submissionsLoading } = useSubmissions(user?.id)
  
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('PYTHON')
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const { submitCode } = useSubmissions(user?.id)

  const handleSubmit = async () => {
    if (!selectedChallenge || !code.trim()) {
      setSubmitMessage('Please select a challenge and write some code')
      return
    }

    setSubmitting(true)
    setSubmitMessage('')

    const result = await submitCode({
      code,
      language,
      userId: user.id,
      challengeId: selectedChallenge.id,
    })

    setSubmitting(false)

    if (result.ok) {
      setSubmitMessage('Code submitted successfully!')
      setCode('')
    } else {
      setSubmitMessage(result.error)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-500/20'
      case 'MEDIUM': return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25 border-yellow-500/20'
      case 'HARD': return 'bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border-red-500/20'
      default: return 'bg-gray-500/15 text-gray-700 dark:text-gray-400 hover:bg-gray-500/25 border-gray-500/20'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20'
      case 'WRONG_ANSWER': return 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/20'
      case 'TIME_LIMIT_EXCEEDED': return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20'
      case 'RUNTIME_ERROR': return 'bg-pink-500/15 text-pink-700 dark:text-pink-400 border-pink-500/20'
      case 'COMPILATION_ERROR': return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/20'
      case 'PENDING': return 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20'
      case 'RUNNING': return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/20'
      default: return 'bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/20'
    }
  }

  const stats = {
    totalChallenges: challenges.length,
    totalSubmissions: submissions.length,
    accepted: submissions.filter(s => s.status === 'ACCEPTED').length,
    avgScore: submissions.length > 0
      ? Math.round(submissions.reduce((acc, s) => acc + s.score, 0) / submissions.length)
      : 0
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Challenges</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalChallenges}</div>
                <p className="text-xs text-muted-foreground">Available to solve</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">Total attempts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.accepted}</div>
                <p className="text-xs text-muted-foreground">Solved problems</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgScore}</div>
                <p className="text-xs text-muted-foreground">Out of 100</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Challenges</CardTitle>
                <CardDescription>Select a challenge to solve</CardDescription>
              </CardHeader>
              <CardContent>
                {challengesLoading ? (
                  <p className="text-center text-muted-foreground">Loading challenges...</p>
                ) : challenges.length === 0 ? (
                  <p className="text-center text-muted-foreground">No challenges available</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedChallenge?.id === challenge.id
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedChallenge(challenge)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{challenge.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {challenge.description}
                            </p>
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {challenge.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Code Editor
                </CardTitle>
                <CardDescription>
                  {selectedChallenge ? selectedChallenge.title : 'Select a challenge to start coding'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChallenge && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Language</label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PYTHON">Python</SelectItem>
                          <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                          <SelectItem value="JAVA">Java</SelectItem>
                          <SelectItem value="CPP">C++</SelectItem>
                          <SelectItem value="TYPESCRIPT">TypeScript</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Code</label>
                      <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your code here..."
                        className="font-mono text-sm min-h-[300px]"
                      />
                    </div>

                    {submitMessage && (
                      <Alert>
                        <AlertDescription>{submitMessage}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={handleSubmit}
                      disabled={submitting || !code.trim()}
                      className="w-full"
                    >
                      {submitting ? 'Submitting...' : 'Submit Code'}
                    </Button>
                  </>
                )}

                {!selectedChallenge && (
                  <div className="text-center py-12 text-muted-foreground">
                    Select a challenge from the left to start coding
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Your latest code submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {submissionsLoading ? (
                <p className="text-center text-muted-foreground">Loading submissions...</p>
              ) : submissions.length === 0 ? (
                <p className="text-center text-muted-foreground">No submissions yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Challenge</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Language</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tests</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.slice(0, 10).map((sub) => (
                        <tr key={sub.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">
                            {sub.challenge?.title || sub.challengeId.substring(0, 8) + '...'}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-xs">
                              {sub.language}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(sub.status)}>
                              {sub.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold">{sub.score}</td>
                          <td className="py-3 px-4 text-sm">
                            {sub.testsPassed}/{sub.testsTotal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
