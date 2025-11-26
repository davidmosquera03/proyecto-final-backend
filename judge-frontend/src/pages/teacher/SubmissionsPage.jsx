import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import Header from '../../components/Header'
import { useSubmissions } from '../../hooks/useApi'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Ban,
  Activity
} from 'lucide-react'

export default function SubmissionsPage() {
  const { user } = useAuth()
  const { submissions, loading, error } = useSubmissions()
  const [userIdFilter, setUserIdFilter] = useState('')
  const [filteredSubmissions, setFilteredSubmissions] = useState([])

  useEffect(() => {
    if (userIdFilter) {
      setFilteredSubmissions(submissions.filter(s => 
        s.userId.toLowerCase().includes(userIdFilter.toLowerCase()) ||
        s.user?.email?.toLowerCase().includes(userIdFilter.toLowerCase())
      ))
    } else {
      setFilteredSubmissions(submissions)
    }
  }, [submissions, userIdFilter])

  const getStats = () => {
    const total = filteredSubmissions.length
    const accepted = filteredSubmissions.filter(s => s.status === 'ACCEPTED').length
    const wrongAnswer = filteredSubmissions.filter(s => s.status === 'WRONG_ANSWER').length
    const timeLimitExceeded = filteredSubmissions.filter(s => s.status === 'TIME_LIMIT_EXCEEDED').length
    const runtimeError = filteredSubmissions.filter(s => s.status === 'RUNTIME_ERROR').length
    const avgTime = filteredSubmissions.length > 0 
      ? Math.round(filteredSubmissions.reduce((acc, s) => acc + (s.executionTime || 0), 0) / filteredSubmissions.length)
      : 0

    return {
      totalSubmissions: total,
      accepted,
      wrongAnswer,
      timeLimitExceeded,
      runtimeError,
      averageExecutionTime: avgTime,
    }
  }

  const stats = getStats()

  const getStatusColor = (status) => {
    switch(status) {
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Submission Tracking</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and analyze student submissions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by User ID or Email"
                  value={userIdFilter}
                  onChange={e => setUserIdFilter(e.target.value)}
                  className="pl-8"
                />
              </div>
              {userIdFilter && (
                <Button 
                  variant="ghost" 
                  onClick={() => setUserIdFilter('')}
                  size="icon"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>Error: {error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.accepted}</div>
                <p className="text-xs text-muted-foreground">Accepted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <XCircle className="h-5 w-5 text-orange-500" />
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.wrongAnswer}</div>
                <p className="text-xs text-muted-foreground">Wrong Answer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Clock className="h-5 w-5 text-red-500" />
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.timeLimitExceeded}</div>
                <p className="text-xs text-muted-foreground">Time Limit</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <AlertTriangle className="h-5 w-5 text-pink-500" />
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{stats.runtimeError}</div>
                <p className="text-xs text-muted-foreground">Runtime Error</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.averageExecutionTime}ms</div>
                <p className="text-xs text-muted-foreground">Avg Time</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Submissions List
                <Badge variant="secondary" className="ml-2">
                  {filteredSubmissions.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading submissions...</div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Ban className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No submissions found matching your criteria
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Challenge</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Language</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tests</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-muted-foreground">
                            {sub.id.substring(0, 8)}...
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex flex-col">
                              <span className="font-medium">{sub.user?.email?.split('@')[0]}</span>
                              <span className="text-xs text-muted-foreground">{sub.user?.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">
                            {sub.challenge?.title || sub.challengeId.substring(0, 8) + '...'}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-xs font-normal">
                              {sub.language}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`text-[10px] px-2 py-0.5 ${getStatusColor(sub.status)}`}>
                              {sub.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm font-bold">
                            {sub.score}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {sub.testsPassed}/{sub.testsTotal}
                          </td>
                          <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                            {sub.executionTime ? `${sub.executionTime}ms` : '-'}
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
