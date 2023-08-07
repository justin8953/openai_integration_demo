import { z } from 'zod';

export const JwtClaimDto = z.object({
  email: z.string().email(),
  sub: z.number(),
  name: z.string(),
});

export type JwtClaimDtoType = z.infer<typeof JwtClaimDto>;

export const loginDto = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(100),
});

export type loginDtoType = z.infer<typeof loginDto>;
