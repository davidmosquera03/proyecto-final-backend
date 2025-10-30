import { IUserRepository } from 'src/domain/users/user.repository.port';
import * as bcrypt from 'bcrypt';

export class RegisterUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, plainPassword: string, role: 'ADMIN' | 'STUDENT') {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already in use');
    const hashed = await bcrypt.hash(plainPassword, 10);
    const user = await this.userRepo.create({ email, password: hashed, role });
    return user;
  }
}
