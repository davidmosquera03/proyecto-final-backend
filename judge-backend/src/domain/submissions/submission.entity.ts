export type Language = 'PYTHON' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'JAVA' | 'CPP';
export type SubmissionStatus = 
  | 'PENDING' 
  | 'RUNNING' 
  | 'ACCEPTED' 
  | 'WRONG_ANSWER' 
  | 'TIME_LIMIT_EXCEEDED' 
  | 'MEMORY_LIMIT_EXCEEDED' 
  | 'RUNTIME_ERROR' 
  | 'COMPILATION_ERROR';

export class Submission {
  constructor(
    public readonly id: string,
    public userId: string,
    public challengeId: string,
    public code: string,
    public language: Language,
    public status: SubmissionStatus,
    public score: number,
    public executionTime: number | null,
    public memoryUsed: number | null,
    public errorMessage: string | null,
    public testsPassed: number,
    public testsTotal: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}


