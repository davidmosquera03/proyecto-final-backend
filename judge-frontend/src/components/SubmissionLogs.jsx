import React, { useState } from 'react'
import { submissionLogs } from '../data/submissionLogs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  User,
  Calendar
} from 'lucide-react'

export default function SubmissionLogs() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null)
  const [expandedEventId, setExpandedEventId] = useState(null)

  const selectedSubmission = submissionLogs.find(s => s.submissionId === selectedSubmissionId)

  function getStatusIcon(status) {
    switch (status) {
      case 'ACCEPTED': return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'WRONG_ANSWER': return <XCircle className="h-4 w-4 text-red-500" />
      case 'TIME_LIMIT_EXCEEDED': return <Clock className="h-4 w-4 text-orange-500" />
      default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'ACCEPTED': return 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20'
      case 'WRONG_ANSWER': return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20'
      case 'TIME_LIMIT_EXCEEDED': return 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/20'
      default: return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'
    }
  }

  function getLogLevelColor(level) {
    switch (level) {
      case 'info': return 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20'
      case 'warning': return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'
      case 'error': return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20'
      default: return 'bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/20'
    }
  }

  function toggleEventExpansion(index) {
    setExpandedEventId(expandedEventId === index ? null : index)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Submission Logs</h2>
        <p className="text-muted-foreground">
          Complete execution tracking with unique IDs and detailed events
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Submissions List */}
        <Card className="lg:col-span-1 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-lg">Submissions ({submissionLogs.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-3 pb-4">
                {submissionLogs.map((submission) => {
                  const isSelected = selectedSubmissionId === submission.submissionId
                  return (
                    <div
                      key={submission.submissionId}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedSubmissionId(submission.submissionId)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={`flex items-center gap-1 ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          {submission.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          {submission.submissionId.substring(0, 8)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium text-sm line-clamp-1">{submission.challengeName}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {submission.userId}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(submission.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="lg:col-span-2 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedSubmission ? `Events for ${selectedSubmission.submissionId}` : 'Event Details'}
            </CardTitle>
            {selectedSubmission && (
              <CardDescription className="flex items-center gap-4 pt-2">
                <span className="flex items-center gap-1">
                  <Terminal className="h-4 w-4" />
                  {selectedSubmission.challengeName}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {selectedSubmission.userId}
                </span>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {selectedSubmission ? (
              <ScrollArea className="h-full px-6">
                <div className="space-y-4 pb-6">
                  <div className="relative pl-4 border-l-2 border-muted space-y-6">
                    {selectedSubmission.events.map((event, index) => {
                      const isExpanded = expandedEventId === index
                      return (
                        <div key={index} className="relative">
                          <div className={`absolute -left-[21px] top-0 h-3 w-3 rounded-full border-2 border-background ${
                            event.level === 'error' ? 'bg-red-500' : 
                            event.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          
                          <div 
                            className="group rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden"
                            onClick={() => toggleEventExpansion(index)}
                          >
                            <div className="p-3 flex items-start gap-3">
                              <Badge variant="outline" className={`uppercase text-[10px] px-1.5 ${getLogLevelColor(event.level)}`}>
                                {event.level}
                              </Badge>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-sm font-medium leading-none">{event.msg}</p>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                                    {event.timestamp}
                                  </span>
                                </div>
                              </div>
                              {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                            </div>

                            {isExpanded && (
                              <div className="px-3 pb-3 pt-0">
                                <div className="bg-muted/50 rounded-md p-3 font-mono text-xs overflow-x-auto">
                                  <pre>
                                    {JSON.stringify(
                                      {
                                        ...Object.fromEntries(
                                          Object.entries(event).filter(
                                            ([key]) => key !== 'level' && key !== 'msg' && key !== 'timestamp'
                                          )
                                        )
                                      },
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <Terminal className="h-12 w-12 mb-4 opacity-20" />
                <p>Select a submission from the list to view its detailed event logs</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
