import { decrypt } from '../src/utils/crypto.util';

const value = process.argv[2];

if (!value) {
  throw new Error('Provide a value to decrypt. Example: npm run secret:decrypt -- iv:cipher');
}

console.log(decrypt(value));
