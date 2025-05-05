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
});
