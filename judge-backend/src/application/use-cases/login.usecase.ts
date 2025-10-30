import { IUserRepository } from 'src/domain/users/user.repository.port';
import * as bcrypt from 'bcrypt';

export class LoginUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) throw new Error('Invalid credentials');
    return user;
  }
}
