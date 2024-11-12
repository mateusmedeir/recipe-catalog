import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
}));
