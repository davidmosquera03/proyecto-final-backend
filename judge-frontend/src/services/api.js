const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

const getAuthToken = () => {
  const token = localStorage.getItem('accessToken')
  return token
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.message || 'Request failed',
      response.status,
      errorData
    )
  }
  
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
  return handleResponse(response)
}

export const authService = {
  async register(email, password, role) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
      skipAuth: true,
    })
    
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        email: data.email,
        role: data.role,
      }))
    }
    
    return data
  },

  async login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    })
    
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        email: data.email,
        role: data.role,
      }))
    }
    
    return data
  },

  async getProfile() {
    return apiRequest('/auth/profile')
  },

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  getStoredUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },
}

export const aiChallengeService = {
  async generateChallengeIdea(category) {
    return apiRequest(`/ai-challenge/challenge-idea?category=${encodeURIComponent(category)}`)
  },

  async generateTestCases(challenge) {
    return apiRequest('/ai-challenge/test-cases', {
      method: 'POST',
      body: JSON.stringify(challenge),
    })
  },
}

export const challengeService = {
  async create(challengeData) {
    return apiRequest('/challenges', {
      method: 'POST',
      body: JSON.stringify(challengeData),
    })
  },

  async getById(id) {
    return apiRequest(`/challenges/${id}`)
  },

  async list() {
    return apiRequest('/challenges')
  },

  async update(id, challengeData) {
    return apiRequest(`/challenges/${id}`, {
      method: 'PUT',
      body: JSON.stringify(challengeData),
    })
  },

  async delete(id) {
    return apiRequest(`/challenges/${id}`, {
      method: 'DELETE',
    })
  },
}

export const courseService = {
  async create(courseData) {
    return apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    })
  },

  async getById(id) {
    return apiRequest(`/courses/${id}`)
  },

  async list() {
    return apiRequest('/courses')
  },

  async update(id, courseData) {
    return apiRequest(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    })
  },

  async delete(id) {
    return apiRequest(`/courses/${id}`, {
      method: 'DELETE',
    })
  },
}

export const testCaseService = {
  async create(testCaseData) {
    return apiRequest('/test-cases', {
      method: 'POST',
      body: JSON.stringify(testCaseData),
    })
  },

  async getById(id) {
    return apiRequest(`/test-cases/${id}`)
  },

  async list(challengeId = null) {
    const url = challengeId 
      ? `/test-cases?challengeId=${challengeId}` 
      : '/test-cases'
    return apiRequest(url)
  },

  async update(id, testCaseData) {
    return apiRequest(`/test-cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testCaseData),
    })
  },

  async delete(id) {
    return apiRequest(`/test-cases/${id}`, {
      method: 'DELETE',
    })
  },
}

export const submissionService = {
  async create(submissionData) {
    return apiRequest('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionData),
    })
  },

  async getById(id) {
    return apiRequest(`/submissions/${id}`)
  },

  async getByUserId(userId) {
    return apiRequest(`/submissions?userId=${userId}`)
  },

  async getAll() {
    return apiRequest('/submissions')
  },
}

export default {
  auth: authService,
  aiChallenge: aiChallengeService,
  challenge: challengeService,
  course: courseService,
  testCase: testCaseService,
  submission: submissionService,
}
