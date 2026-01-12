import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../domain/password-hasher';

export class PasswordHasherImpl implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return await bcrypt.hash(plain, 10);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
