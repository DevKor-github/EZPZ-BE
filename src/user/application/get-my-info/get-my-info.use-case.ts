import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { GetMyInfoRequestDto } from './dto/get-my-info.request.dto';
import { GetMyInfoResponseDto } from './dto/get-my-info.response.dto';

@Injectable()
export class GetMyInfoUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(getMyInfoRequestDto: GetMyInfoRequestDto): Promise<GetMyInfoResponseDto> {
    const { userId } = getMyInfoRequestDto;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

    return { email: user.email };
  }
}
