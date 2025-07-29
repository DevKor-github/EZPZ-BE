import { Inject, Injectable } from '@nestjs/common';
import { UpdateMediaRequestDto } from './dto/update.request.dto';
import { Identifier } from 'src/shared/core/domain/identifier';
import { S3Adapter } from '../../infrastructure/util/s3.adpater';
import { MEDIA_COMMAND_REPOSITORY, MediaCommandRepository } from '../../domain/media.command.repository';
import { Media } from '../../domain/media';

@Injectable()
export class UpdateMediaUseCase {
  constructor(
    @Inject(MEDIA_COMMAND_REPOSITORY)
    private readonly mediaCommandRepository: MediaCommandRepository,
    private readonly s3Adapter: S3Adapter,
  ) {}

  async execute(reqDto: UpdateMediaRequestDto): Promise<void> {
    const { articleId, thumbnailInfo, fileInfoList } = reqDto;

    const existingMedias = await this.mediaCommandRepository.findByArticleId(articleId);
    const existingMap = new Map(existingMedias.map((m) => [m.order, m]));

    const incomingMediaList: Media[] = [];
    const incomingOrders = new Set<number>();

    incomingOrders.add(0);
    incomingMediaList.push(this.createMedia(articleId, thumbnailInfo.imageUrl, 0, existingMap.get(0)));

    for (let i = 0; i < fileInfoList.length; i++) {
      const order = i + 1;
      const fileInfo = fileInfoList[i];

      incomingOrders.add(order);
      incomingMediaList.push(this.createMedia(articleId, fileInfo.imageUrl, order, existingMap.get(order)));
    }

    const toDelete = existingMedias.filter((media) => !incomingOrders.has(media.order));
    if (toDelete.length > 0) {
      await this.mediaCommandRepository.deleteByIds(toDelete.map((m) => m.id.value));
    }

    await this.mediaCommandRepository.updateAll(incomingMediaList);
  }

  private createMedia(articleId: string, imageUrl: string, order: number, existingMedia?: Media): Media {
    return Media.create({
      id: existingMedia?.id ?? Identifier.create(),
      createdAt: existingMedia?.createdAt ?? new Date(),
      updatedAt: new Date(),
      order,
      mediaPath: imageUrl,
      articleId: Identifier.from(articleId),
    });
  }
}
