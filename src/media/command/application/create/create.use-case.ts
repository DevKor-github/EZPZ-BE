import { Inject, Injectable } from '@nestjs/common';
import { MEDIA_COMMAND_REPOSITORY, MediaCommandRepository } from '../../domain/media.command.repository';
import { S3Adapter } from '../../infrastructure/util/s3.adpater';
import { CreateMediaRequestDto } from './dto/create.request.dto';
import { Media } from '../../domain/media';
import { Identifier } from 'src/shared/domain/value-object/identifier';

@Injectable()
export class CreateMediaUseCase {
  constructor(
    @Inject(MEDIA_COMMAND_REPOSITORY)
    private readonly mediaCommandRepository: MediaCommandRepository,
    private readonly s3Adapter: S3Adapter,
  ) {}

  async execute(reqDto: CreateMediaRequestDto): Promise<void> {
    const { articleId, thumbnailInfo, fileInfoList } = reqDto;
    const mediaList: Media[] = [];

    mediaList.push(this.createMedia(articleId, thumbnailInfo.objectKey, 0));

    for (let i = 0; i < fileInfoList.length; i++) {
      const fileInfo = fileInfoList[i];

      mediaList.push(this.createMedia(articleId, fileInfo.objectKey, i + 1));
    }

    await this.mediaCommandRepository.saveAll(mediaList);
  }

  private createMedia(articleId: string, objectKey: string, order: number): Media {
    const mediaId = Identifier.create();
    const imageUrl = this.s3Adapter.generateImageUrl(objectKey);

    return Media.create({
      id: mediaId,
      createdAt: new Date(),
      updatedAt: new Date(),
      order,
      mediaPath: imageUrl,
      articleId: Identifier.from(articleId),
    });
  }
}
