import { Inject, Injectable } from '@nestjs/common';
import { DeleteMyInfoRequestDto } from './dto/delete-my-info.request.dto';
import { USER_REPOSITORY, UserRepository } from 'src/user/domain/repository/user.repository';

@Injectable()
export class DeleteMyInfoUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(deleteMyInfoRequestDto: DeleteMyInfoRequestDto): Promise<void> {
    const { userId } = deleteMyInfoRequestDto;

    await this.userRepository.deleteById(userId);
  }
}
