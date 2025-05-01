import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';

export interface UserRepository {
  save(user: UserEntity): Promise<void>;
}
