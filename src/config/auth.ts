export default {
  jwt: {
    secret: process.env.APP_SECRET as string,
    expiresIn: '1d',
  },
};
