import { compareHash, generateHash } from './utils';

describe('Auth Utils', () => {
  it('compare password hash', async () => {
    const password = '123456';
    const hash = await generateHash(password);
    const match = await compareHash(password, hash);
    expect(match).toBe(true);
  });
});
