import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.example' });

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
};

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://automationexercise.com',
  headless: parseBoolean(process.env.HEADLESS, true),
  defaultPassword: process.env.DEFAULT_PASSWORD ?? 'Password123!',
  encryptionKey: process.env.ENCRYPTION_KEY ?? 'local-dev-only-passphrase'
};
