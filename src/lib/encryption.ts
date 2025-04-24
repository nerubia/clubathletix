import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

interface TokenPayload {
  [key: string]: any;
}

export function verifyJWT(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}
export function generateJWT(payload: Record<string, string | number>, expiresIn: string = process.env.JWT_EXPIRES_IN || '1h'): string {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: `${expiresIn}` as any
  });
}