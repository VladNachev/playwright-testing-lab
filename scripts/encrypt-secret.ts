import { encrypt } from '../src/utils/crypto.util';

const value = process.argv[2];

if (!value) {
  throw new Error('Provide a value to encrypt. Example: npm run secret:encrypt -- myPassword');
}

console.log(encrypt(value));
