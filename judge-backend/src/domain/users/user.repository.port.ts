import { User } from '../users/user.entity';

export interface IUserRepository {
  create(userData: { email: string; password: string; role: 'ADMIN' | 'STUDENT' | 'TEACHER' }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateHashedRefreshToken(userId: string, hashed: string | null): Promise<void>;
}
