import * as bcrypt from 'bcrypt';

export function generateRandomSecret(length: number) {
  return Math.random().toString(36).substring(length);
}

export async function generateHash(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function compareHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
