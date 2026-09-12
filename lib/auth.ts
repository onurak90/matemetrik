import crypto from 'crypto';

const COOKIE_NAME = 'matemetrik_session';

const DEFAULT_SALT = '27f0170b818d71d544830a7dd8c06264';
const DEFAULT_HASH = '84eb9ffc6f5a3b18c6836a2c26d1df898710d64fe0655bd11b1438e43fbc91fa23c4f2148150643482c9341d845ffb0b892a5e39df27d2aec9712adb8bfc695e';
const DEFAULT_SECRET = '8040c15688f79386b3f1a73dd94af2cf3a8c5f707813d8da60d90be636addcee';

export { COOKIE_NAME };

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME || 'onurak90';
  const expectedSalt = process.env.ADMIN_PASSWORD_SALT || DEFAULT_SALT;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;

  if (username !== expectedUsername) {
    return false;
  }

  const computedHash = crypto
    .pbkdf2Sync(password, expectedSalt, 100000, 64, 'sha512')
    .toString('hex');

  try {
    const a = Buffer.from(computedHash, 'hex');
    const b = Buffer.from(expectedHash, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function createSessionToken(username: string): string {
  const secret = process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [data, signature] = parts;
  const secret = process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;
  const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));
    if (!payload.exp || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
