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

export const UserDto = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
});

export type UserDtoType = z.infer<typeof UserDto>;

export const ChatTypeDto = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100).optional(),
});

export type ChatTypeDtoType = z.infer<typeof ChatTypeDto>;
