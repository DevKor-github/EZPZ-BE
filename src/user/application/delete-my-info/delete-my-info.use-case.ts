import { Injectable } from '@nestjs/common';
import { DeleteMyInfoRequestDto } from './dto/delete-my-info.request.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { UserRepository } from 'src/user/domain/repository/user.repository';

@Injectable()
export class DeleteMyInfoUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(deleteMyInfoRequestDto: DeleteMyInfoRequestDto): Promise<void> {
    const { userId } = deleteMyInfoRequestDto;

    await this.userRepository.deleteById(userId);
  }
}
