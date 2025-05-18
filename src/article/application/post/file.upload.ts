import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Identifier } from 'src/shared/domain/value-object/identifier';

@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File): Promise<string> {
    const uploadDir = this.configService.get<string>('UPLOAD_DIR', 'uploads');

    // Snowflake ID 생성
    const fileId = Identifier.create().value;
    const uniqueFileName = `${fileId}${path.extname(file.originalname)}`;

    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, file.buffer);

    return fileId; // ID 반환 (파일 경로가 아닌)
  }

  // 파일 삭제 메서드 (필요한 경우)
  async delete(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error: unknown) {
      // 파일이 이미 없는 경우 무시
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return;
      }
      throw error;
    }
  }
}
