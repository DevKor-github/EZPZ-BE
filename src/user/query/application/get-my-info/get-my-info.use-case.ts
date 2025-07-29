import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetMyInfoRequestDto } from './dto/get-my-info.request.dto';
import { GetMyInfoResponseDto } from './dto/get-my-info.response.dto';
import { USER_QUERY_REPOSITORY, UserQueryRepository } from '../../domain/user.query.repository';

@Injectable()
export class GetMyInfoUseCase {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(getMyInfoRequestDto: GetMyInfoRequestDto): Promise<GetMyInfoResponseDto> {
    const { userId } = getMyInfoRequestDto;
    const user = await this.userQueryRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

    return { email: user.email };
  }
}
