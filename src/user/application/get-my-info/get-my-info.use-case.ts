import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from 'src/user/domain/repository/user.repository';
import { GetMyInfoRequestDto } from './dto/get-my-info.request.dto';
import { GetMyInfoResponseDto } from './dto/get-my-info.response.dto';

@Injectable()
export class GetMyInfoUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(getMyInfoRequestDto: GetMyInfoRequestDto): Promise<GetMyInfoResponseDto> {
    const { userId } = getMyInfoRequestDto;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

    return { email: user.email };
  }
}
