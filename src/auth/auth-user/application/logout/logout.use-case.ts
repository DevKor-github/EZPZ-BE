import { Inject, Injectable } from '@nestjs/common';
import { LogoutRequestDto } from './dto/logout.request.dto';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AUTH_REPOSITORY, AuthRepository } from '../../domain/auth.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(requestDto: LogoutRequestDto): Promise<void> {
    const { userId } = requestDto;
    const auth = await this.authRepository.findByUserId(userId);
    if (!auth) throw new CustomException(CustomExceptionCode.AUTH_INFO_NOT_FOUND);

    auth.updateRefreshToken(null, new Date());
    await this.authRepository.update(auth);
  }
}
