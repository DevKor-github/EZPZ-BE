import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

@Injectable()
export class S3Adapter {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cloudFrontDomain: string;

  constructor(private readonly configSerivce: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configSerivce.getOrThrow('aws.region'),
      credentials: {
        accessKeyId: this.configSerivce.getOrThrow('aws.accessKeyId'),
        secretAccessKey: this.configSerivce.getOrThrow('aws.secretAccessKey'),
      },
    });
    this.bucketName = this.configSerivce.getOrThrow('aws.s3.bucketName');
    this.cloudFrontDomain = this.configSerivce.getOrThrow('aws.s3.cloudFrontDomain');
  }

  async upload(articleId: string, fileName: string, mimeType: string) {
    const objectKey = this.generateKey(fileName, articleId);
    const presignedUrl = await this.generatePresignedUrl(mimeType, objectKey);
    const imageUrl = this.generateImageUrl(objectKey);

    return { presignedUrl, imageUrl };
  }

  async delete() {}

  private generateKey(fileName: string, articleId: string): string {
    const extension = fileName.split('.').pop();
    const uuid = v4();

    return `images/${articleId}/${uuid}.${extension}`;
  }

  generateImageUrl(key: string): string {
    return `${this.cloudFrontDomain}/${key}`;
  }

  private async generatePresignedUrl(mimeType: string, objectKey: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: objectKey,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);

    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
