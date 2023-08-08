import { z } from 'zod';

export const UserDto = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  roles: z.array(z.string()).optional(),
});

export type UserDtoType = z.infer<typeof UserDto>;
