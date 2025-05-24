import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function signJwt(payload: JwtPayload, options: SignOptions = { expiresIn: '1h' }): string {
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
