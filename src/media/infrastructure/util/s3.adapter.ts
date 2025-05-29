import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

@Injectable()
export class S3Adapter {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly bucketDomain: string;
  // private readonly cloudFrontDomain: string;

  constructor(private readonly configSerivce: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configSerivce.getOrThrow('aws.region'),
      credentials: {
        accessKeyId: this.configSerivce.getOrThrow('aws.accessKeyId'),
        secretAccessKey: this.configSerivce.getOrThrow('aws.secretAccessKey'),
      },
    });
    this.bucketName = this.configSerivce.getOrThrow('aws.s3.bucketName');
    this.bucketDomain = this.configSerivce.getOrThrow('aws.s3.bucketDomain');
    // this.cloudFrontDomain = this.configSerivce.getOrThrow('aws.s3.cloudFrontDomain');
  }

  async upload(articleId: string, fileName: string, mimeType: string) {
    const key = this.generateKey(fileName, articleId);
    const imageUrl = this.generateImageUrl(key);
    const presignedUrl = await this.generatePresignedUrl(mimeType, key);

    return { presignedUrl, imageUrl };
  }

  async delete() {}

  private generateKey(fileName: string, articleId: string): string {
    const extension = fileName.split('.').pop();
    const uuid = v4();

    return `images/${articleId}/${uuid}.${extension}`;
  }

  private generateImageUrl(key: string): string {
    return `${this.bucketDomain}/${key}`;
  }

  private async generatePresignedUrl(mimeType: string, key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);

    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  /*
  async upload(file: Express.Multer.File, articleId: string): Promise<string> {
    const { originalname, buffer } = file;

    const key = this.generateKey(originalname, articleId);

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(params));

    return `${this.bucketDomain}/${key}`;
  }
  */
}
