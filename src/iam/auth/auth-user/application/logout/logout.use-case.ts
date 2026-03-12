import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AUTH_USER_STORE, AuthUserStore } from '../../domain/auth-user.repository';
import { LogoutCommand } from './logout.command';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(AUTH_USER_STORE)
    private readonly authRepository: AuthUserStore,
  ) {}

  async execute(command: LogoutCommand): Promise<void> {
    const { userId } = command;
    const auth = await this.authRepository.findByUserId(userId);
    if (!auth) throw new CustomException(CustomExceptionCode.AUTH_INFO_NOT_FOUND);

    auth.updateRefreshToken(null, new Date());
    await this.authRepository.update(auth);
  }
}
