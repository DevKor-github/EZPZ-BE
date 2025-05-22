import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { MediaRepository } from 'src/media/domain/repository/media.repository';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { S3Adapter } from 'src/media/infrastructure/util/s3.adapter';

@Injectable()
export class DeleteFileUseCase {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: MediaRepository,
    private readonly s3Adapter: S3Adapter,
  ) {}

  async execute(): Promise<void> {}
}
