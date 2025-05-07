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
});
