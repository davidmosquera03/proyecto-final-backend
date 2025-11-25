import React, { useState } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import Header from '../../components/Header'
import { useCourses, useChallenges } from '../../hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Badge } from '../../components/ui/badge'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { 
  Plus, 
  Trash2, 
  BookOpen, 
  Code, 
  FileText, 
  Users,
  ChevronRight
} from 'lucide-react'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const { courses, createCourse, deleteCourse, loading: coursesLoading } = useCourses()
  const { challenges, loading: challengesLoading } = useChallenges()
  const navigate = useNavigate()
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    const result = await createCourse({
      name: courseName,
      code: courseCode,
      description: courseDescription || undefined,
    })

    if (result.ok) {
      setMessage('Course created successfully!')
      setIsError(false)
      setCourseName('')
      setCourseCode('')
      setCourseDescription('')
      setShowCourseForm(false)
    } else {
      setMessage(`Error: ${result.error}`)
      setIsError(true)
    }
  }

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return
    
    const result = await deleteCourse(id)
    if (result.ok) {
      setMessage('Course deleted successfully')
      setIsError(false)
    } else {
      setMessage(`Error: ${result.error}`)
      setIsError(true)
    }
  }

  const handleCreateTest = () => {
    navigate('/teacher/create-test')
  }

  const handleViewSubmissions = () => {
    navigate('/teacher/submissions')
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20'
      case 'MEDIUM': return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'
      case 'HARD': return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20'
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
              <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage courses, challenges, and view student progress
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                {user?.role}
              </Badge>
            </div>
          </div>

          {message && (
            <Alert variant={isError ? "destructive" : "default"} className={!isError ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20" : ""}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setShowCourseForm(!showCourseForm)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Course</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Create Course</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Set up a new class for students
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={handleCreateTest}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Challenge</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Create Challenge</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Add a new programming problem
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={handleViewSubmissions}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">View All</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Check student solutions
                </p>
              </CardContent>
            </Card>
          </div>

          {showCourseForm && (
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle>Create New Course</CardTitle>
                <CardDescription>Enter the details for the new course</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        placeholder="e.g. Introduction to Algorithms"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseCode">Course Code</Label>
                      <Input
                        id="courseCode"
                        value={courseCode}
                        onChange={e => setCourseCode(e.target.value)}
                        placeholder="e.g. CS101"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseDescription">Description</Label>
                    <Textarea
                      id="courseDescription"
                      value={courseDescription}
                      onChange={e => setCourseDescription(e.target.value)}
                      placeholder="Brief description of the course..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowCourseForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Course</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">Active Courses</h2>
                <Badge variant="secondary">{courses.length}</Badge>
              </div>
              
              {coursesLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading courses...</div>
              ) : courses.length === 0 ? (
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No courses created yet</p>
                    <Button variant="link" onClick={() => setShowCourseForm(true)}>Create one now</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {courses.map((course) => (
                    <Card key={course.id} className="group hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {course.name}
                            <Badge variant="outline" className="text-xs font-normal">
                              {course.code}
                            </Badge>
                          </div>
                          {course.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {course.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">Challenge Library</h2>
                <Badge variant="secondary">{challenges.length}</Badge>
              </div>

              {challengesLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading challenges...</div>
              ) : challenges.length === 0 ? (
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <Code className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No challenges created yet</p>
                    <Button variant="link" onClick={handleCreateTest}>Create one now</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="group hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-4">
                          <div className="font-semibold truncate">{challenge.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-[10px] px-1.5 py-0 h-5 ${getDifficultyColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </Badge>
                            {challenge.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs text-muted-foreground bg-muted px-1.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
