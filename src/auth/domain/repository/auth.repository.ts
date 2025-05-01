import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';

export interface AuthRepository {
  save(authEntity: AuthEntity): Promise<void>;
}
