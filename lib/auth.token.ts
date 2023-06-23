import { Secret, sign, verify, JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

export const createAccessToken = (id: string, email: string, role?: string): string => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const expiresIn = process.env.ACCESS_TOKEN_REFRESH_TIME;

  const token = sign(
    { id, email },
    accessTokenSecret,
    { expiresIn }
  );

  return token;
}

export interface AccessTokenPayload extends JwtPayload {
  id: string;
  email: string;
  role?: string;
}

export function verifyAccessToken(token: string, secret: Secret): AccessTokenPayload {
  try {
    const payload = verify(token, secret) as AccessTokenPayload;
    if (payload.id && payload.email) {
      return payload;
    }
    throw new Error("Error! Invalid access token");
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      throw new Error("sorry, the access token has expired");
    } else if (error instanceof JsonWebTokenError) {
      throw new Error("Invalid access token");
    } else {
      throw error;
    }
  }
}


