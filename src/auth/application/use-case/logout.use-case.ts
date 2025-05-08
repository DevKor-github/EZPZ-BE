import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutUseCase {
  constructor() {}

  async execute() {
    // 로그아웃 시, db의 refresh token 삭제 하도록 구현
  }
}
