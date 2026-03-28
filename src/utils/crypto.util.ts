import crypto from 'node:crypto';

import { env } from '../config/env';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

const deriveKey = (secret: string): Buffer =>
  crypto.createHash('sha256').update(secret).digest();

export const encrypt = (plainText: string, secret = env.encryptionKey): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, deriveKey(secret), iv);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (cipherText: string, secret = env.encryptionKey): string => {
  const [ivHex, encryptedHex] = cipherText.split(':');

  if (!ivHex || !encryptedHex) {
    throw new Error('Encrypted value is not in the expected iv:cipher format.');
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    deriveKey(secret),
    Buffer.from(ivHex, 'hex')
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, 'hex')),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
};
