import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

export function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.course.list()
      setCourses(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const createCourse = async (courseData) => {
    try {
      const newCourse = await api.course.create(courseData)
      setCourses([...courses, newCourse])
      return { ok: true, data: newCourse }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const updateCourse = async (id, courseData) => {
    try {
      const updated = await api.course.update(id, courseData)
      setCourses(courses.map(c => c.id === id ? updated : c))
      return { ok: true, data: updated }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const deleteCourse = async (id) => {
    try {
      await api.course.delete(id)
      setCourses(courses.filter(c => c.id !== id))
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  }
}

export function useChallenges() {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchChallenges = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.challenge.list()
      setChallenges(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchChallenges()
  }, [fetchChallenges])

  const createChallenge = async (challengeData) => {
    try {
      const newChallenge = await api.challenge.create(challengeData)
      setChallenges([...challenges, newChallenge])
      return { ok: true, data: newChallenge }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const updateChallenge = async (id, challengeData) => {
    try {
      const updated = await api.challenge.update(id, challengeData)
      setChallenges(challenges.map(c => c.id === id ? updated : c))
      return { ok: true, data: updated }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const deleteChallenge = async (id) => {
    try {
      await api.challenge.delete(id)
      setChallenges(challenges.filter(c => c.id !== id))
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  return {
    challenges,
    loading,
    error,
    fetchChallenges,
    createChallenge,
    updateChallenge,
    deleteChallenge,
  }
}

export function useTestCases(challengeId = null) {
  const [testCases, setTestCases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTestCases = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.testCase.list(challengeId)
      setTestCases(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [challengeId])

  useEffect(() => {
    fetchTestCases()
  }, [fetchTestCases])

  const createTestCase = async (testCaseData) => {
    try {
      const newTestCase = await api.testCase.create(testCaseData)
      setTestCases([...testCases, newTestCase])
      return { ok: true, data: newTestCase }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const updateTestCase = async (id, testCaseData) => {
    try {
      const updated = await api.testCase.update(id, testCaseData)
      setTestCases(testCases.map(tc => tc.id === id ? updated : tc))
      return { ok: true, data: updated }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const deleteTestCase = async (id) => {
    try {
      await api.testCase.delete(id)
      setTestCases(testCases.filter(tc => tc.id !== id))
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  return {
    testCases,
    loading,
    error,
    fetchTestCases,
    createTestCase,
    updateTestCase,
    deleteTestCase,
  }
}

export function useSubmissions(userId = null) {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = userId 
        ? await api.submission.getByUserId(userId)
        : await api.submission.getAll()
      setSubmissions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const submitCode = async (submissionData) => {
    try {
      const result = await api.submission.create(submissionData)
      return { ok: true, data: result }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const getSubmission = async (id) => {
    try {
      const data = await api.submission.getById(id)
      return { ok: true, data }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    submitCode,
    getSubmission,
  }
}

export function useAIChallenge() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateIdea = async (category) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.aiChallenge.generateChallengeIdea(category)
      return { ok: true, data }
    } catch (err) {
      setError(err.message)
      return { ok: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const generateTestCases = async (challenge) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.aiChallenge.generateTestCases(challenge)
      return { ok: true, data }
    } catch (err) {
      setError(err.message)
      return { ok: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    generateIdea,
    generateTestCases,
  }
}
