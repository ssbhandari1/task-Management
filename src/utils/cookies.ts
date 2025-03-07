
import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'auth_token';

export const setCookie = (res: any, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
};

export const getCookie = (req: any): string | undefined => {
  const cookies = parse(req.headers.cookie || '');
  return cookies[TOKEN_NAME];
};
