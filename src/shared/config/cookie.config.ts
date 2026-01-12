import { CookieOptions } from 'express';
import 'dotenv/config';

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 3 * 60 * 60 * 1000, // 3 hour
  path: '/',
  domain: process.env.FRONTEND_DOMAIN,
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: '/',
  domain: process.env.FRONTEND_DOMAIN,
};
