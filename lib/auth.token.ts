import { Secret, sign } from 'jsonwebtoken'

export const createAccessToken = (id: string, role: string): string => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const expiresIn = process.env.ACCESS_TOKEN_REFRESH_TIME;

  const token = sign(
    { id, role },
    accessTokenSecret,
    { expiresIn }
  );

  return token;
}
