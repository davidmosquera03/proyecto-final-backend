/**
 * Datos de prueba: Logs estructurados de submissions
 * Cada submission genera múltiples eventos JSON con seguimiento
 */

export const submissionLogs = [
  // Submission 1: Accepted - Two Sum
  {
    submissionId: 'subm-001',
    userId: 'user-123',
    challengeId: 'ch-two-sum',
    challengeName: 'Two Sum',
    createdAt: new Date('2025-11-13T10:15:00').toISOString(),
    status: 'ACCEPTED',
    events: [
      {
        level: 'info',
        msg: 'Submission created',
        submissionId: 'subm-001',
        userId: 'user-123',
        challengeId: 'ch-two-sum',
        timestamp: '2025-11-13T10:15:00Z'
      },
      {
        level: 'info',
        msg: 'Runner started execution',
        submissionId: 'subm-001',
        language: 'javascript',
        timeLimit: 1500,
        memoryLimit: 256,
        timestamp: '2025-11-13T10:15:05Z'
      },
      {
        level: 'info',
        msg: 'Test case 1 passed',
        submissionId: 'subm-001',
        testCaseId: 'tc-001',
        durationMs: 45,
        timestamp: '2025-11-13T10:15:06Z'
      },
      {
        level: 'info',
        msg: 'Test case 2 passed',
        submissionId: 'subm-001',
        testCaseId: 'tc-002',
        durationMs: 38,
        timestamp: '2025-11-13T10:15:07Z'
      },
      {
        level: 'info',
        msg: 'Test case 3 passed',
        submissionId: 'subm-001',
        testCaseId: 'tc-003',
        durationMs: 52,
        timestamp: '2025-11-13T10:15:08Z'
      },
      {
        level: 'info',
        msg: 'Runner finished execution',
        submissionId: 'subm-001',
        status: 'ACCEPTED',
        durationMs: 730,
        passedTests: 3,
        totalTests: 3,
        timestamp: '2025-11-13T10:15:10Z'
      }
    ]
  },

  // Submission 2: Wrong Answer - Reverse Linked List
  {
    submissionId: 'subm-002',
    userId: 'user-124',
    challengeId: 'ch-reverse-list',
    challengeName: 'Reverse Linked List',
    createdAt: new Date('2025-11-13T10:20:30').toISOString(),
    status: 'WRONG_ANSWER',
    events: [
      {
        level: 'info',
        msg: 'Submission created',
        submissionId: 'subm-002',
        userId: 'user-124',
        challengeId: 'ch-reverse-list',
        timestamp: '2025-11-13T10:20:30Z'
      },
      {
        level: 'info',
        msg: 'Runner started execution',
        submissionId: 'subm-002',
        language: 'python',
        timeLimit: 1000,
        memoryLimit: 128,
        timestamp: '2025-11-13T10:20:35Z'
      },
      {
        level: 'info',
        msg: 'Test case 1 passed',
        submissionId: 'subm-002',
        testCaseId: 'tc-001',
        durationMs: 32,
        timestamp: '2025-11-13T10:20:36Z'
      },
      {
        level: 'error',
        msg: 'Test case 2 failed',
        submissionId: 'subm-002',
        testCaseId: 'tc-002',
        expected: '[1, 2, 3]',
        actual: '[3, 2, 1]',
        durationMs: 41,
        timestamp: '2025-11-13T10:20:37Z'
      },
      {
        level: 'info',
        msg: 'Runner finished execution',
        submissionId: 'subm-002',
        status: 'WRONG_ANSWER',
        durationMs: 285,
        passedTests: 1,
        totalTests: 3,
        timestamp: '2025-11-13T10:20:38Z'
      }
    ]
  },

  // Submission 3: Time Limit Exceeded - Stack With Min
  {
    submissionId: 'subm-003',
    userId: 'user-125',
    challengeId: 'ch-stack-min',
    challengeName: 'Stack With Min',
    createdAt: new Date('2025-11-13T10:35:15').toISOString(),
    status: 'TIME_LIMIT_EXCEEDED',
    events: [
      {
        level: 'info',
        msg: 'Submission created',
        submissionId: 'subm-003',
        userId: 'user-125',
        challengeId: 'ch-stack-min',
        timestamp: '2025-11-13T10:35:15Z'
      },
      {
        level: 'info',
        msg: 'Runner started execution',
        submissionId: 'subm-003',
        language: 'javascript',
        timeLimit: 1000,
        memoryLimit: 128,
        timestamp: '2025-11-13T10:35:20Z'
      },
      {
        level: 'warning',
        msg: 'Test case 1 running',
        submissionId: 'subm-003',
        testCaseId: 'tc-001',
        elapsedMs: 950,
        timestamp: '2025-11-13T10:35:21Z'
      },
      {
        level: 'error',
        msg: 'Time limit exceeded on test case 1',
        submissionId: 'subm-003',
        testCaseId: 'tc-001',
        timeLimit: 1000,
        durationMs: 1045,
        timestamp: '2025-11-13T10:35:22Z'
      },
      {
        level: 'info',
        msg: 'Runner finished execution',
        submissionId: 'subm-003',
        status: 'TIME_LIMIT_EXCEEDED',
        durationMs: 1450,
        passedTests: 0,
        totalTests: 3,
        timestamp: '2025-11-13T10:35:23Z'
      }
    ]
  },

  // Submission 4: Accepted - Stack With Min
  {
    submissionId: 'subm-004',
    userId: 'user-126',
    challengeId: 'ch-stack-min',
    challengeName: 'Stack With Min',
    createdAt: new Date('2025-11-13T11:00:45').toISOString(),
    status: 'ACCEPTED',
    events: [
      {
        level: 'info',
        msg: 'Submission created',
        submissionId: 'subm-004',
        userId: 'user-126',
        challengeId: 'ch-stack-min',
        timestamp: '2025-11-13T11:00:45Z'
      },
      {
        level: 'info',
        msg: 'Runner started execution',
        submissionId: 'subm-004',
        language: 'cpp',
        timeLimit: 1000,
        memoryLimit: 128,
        timestamp: '2025-11-13T11:00:50Z'
      },
      {
        level: 'info',
        msg: 'Test case 1 passed',
        submissionId: 'subm-004',
        testCaseId: 'tc-001',
        durationMs: 28,
        timestamp: '2025-11-13T11:00:51Z'
      },
      {
        level: 'info',
        msg: 'Test case 2 passed',
        submissionId: 'subm-004',
        testCaseId: 'tc-002',
        durationMs: 35,
        timestamp: '2025-11-13T11:00:52Z'
      },
      {
        level: 'info',
        msg: 'Test case 3 passed',
        submissionId: 'subm-004',
        testCaseId: 'tc-003',
        durationMs: 42,
        timestamp: '2025-11-13T11:00:53Z'
      },
      {
        level: 'info',
        msg: 'Runner finished execution',
        submissionId: 'subm-004',
        status: 'ACCEPTED',
        durationMs: 515,
        passedTests: 3,
        totalTests: 3,
        timestamp: '2025-11-13T11:00:55Z'
      }
    ]
  },

  // Submission 5: Runtime Error
  {
    submissionId: 'subm-005',
    userId: 'user-127',
    challengeId: 'ch-two-sum',
    challengeName: 'Two Sum',
    createdAt: new Date('2025-11-13T11:15:20').toISOString(),
    status: 'RUNTIME_ERROR',
    events: [
      {
        level: 'info',
        msg: 'Submission created',
        submissionId: 'subm-005',
        userId: 'user-127',
        challengeId: 'ch-two-sum',
        timestamp: '2025-11-13T11:15:20Z'
      },
      {
        level: 'info',
        msg: 'Runner started execution',
        submissionId: 'subm-005',
        language: 'java',
        timeLimit: 1500,
        memoryLimit: 256,
        timestamp: '2025-11-13T11:15:25Z'
      },
      {
        level: 'error',
        msg: 'Runtime error during compilation',
        submissionId: 'subm-005',
        error: 'NullPointerException at line 15',
        stackTrace: 'at Solution.twoSum(Solution.java:15)\nat Main.main(Main.java:5)',
        timestamp: '2025-11-13T11:15:26Z'
      },
      {
        level: 'info',
        msg: 'Runner finished execution',
        submissionId: 'subm-005',
        status: 'RUNTIME_ERROR',
        durationMs: 150,
        passedTests: 0,
        totalTests: 3,
        timestamp: '2025-11-13T11:15:27Z'
      }
    ]
  }
];

/**
 * Función auxiliar para obtener los logs agrupados por submission
 */
export function getSubmissionSummary(submissionId) {
  const submission = submissionLogs.find(s => s.submissionId === submissionId);
  return submission;
}

/**
 * Función auxiliar para obtener el historial completo de logs de una submission
 */
export function getSubmissionEventLog(submissionId) {
  const submission = submissionLogs.find(s => s.submissionId === submissionId);
  return submission?.events || [];
}

/**
 * Función auxiliar para obtener estadísticas agregadas
 */
export function getSubmissionStatistics() {
  const stats = {
    totalSubmissions: submissionLogs.length,
    accepted: submissionLogs.filter(s => s.status === 'ACCEPTED').length,
    wrongAnswer: submissionLogs.filter(s => s.status === 'WRONG_ANSWER').length,
    timeLimitExceeded: submissionLogs.filter(s => s.status === 'TIME_LIMIT_EXCEEDED').length,
    runtimeError: submissionLogs.filter(s => s.status === 'RUNTIME_ERROR').length,
    averageExecutionTime: Math.round(
      submissionLogs.reduce((sum, s) => {
        const lastEvent = s.events[s.events.length - 1];
        return sum + (lastEvent?.durationMs || 0);
      }, 0) / submissionLogs.length
    )
  };
  return stats;
}
