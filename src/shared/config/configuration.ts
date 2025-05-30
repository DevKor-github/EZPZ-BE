export default () => ({
  // Sever
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
  },

  // Kakao
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUri: process.env.KAKAO_REDIRECT_URI,
  },

  // Jwt
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiration: process.env.JWT_ACCESS_EXPIRATION,
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiration: process.env.JWT_REFRESH_EXPIRATION,
    },
  },

  // AWS
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      bucketDomain: process.env.AWS_S3_BUCKET_DOMAIN,
      cloudFrontDomain: process.env.AWS_S3_CLOUDFRONT_DOMAIN,
    },
  },
});
