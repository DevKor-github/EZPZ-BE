import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AUTH_REPOSITORY, AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { LogoutRequestDto } from './dto/logout.request.dto';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(requestDto: LogoutRequestDto): Promise<void> {
    const { userId } = requestDto;
    const auth = await this.authRepository.findByUserId(userId);
    if (!auth) throw new InternalServerErrorException('해당 유저의 인증 정보가 없습니다.');

    auth.updateRefreshToken(null, new Date());
    await this.authRepository.update(auth);
  }
}
