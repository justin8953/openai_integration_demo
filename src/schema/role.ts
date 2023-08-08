import { z } from 'zod';
export const Permissions = [
  'all',
  'user.read',
  'user.write',
  'user.update',
  'user.delete',
  'role.read',
  'role.write',
  'role.update',
  'role.delete',
  'chat.read',
  'chat.write',
  'chat.update',
  'chat.delete',
] as const;
export const PermissionDto = z.enum(Permissions);

export type PermissionDtoType = z.infer<typeof PermissionDto>;

export const RoleDto = z.object({
  id: z.string().optional(),
  name: z.string(),
  permissions: z.array(PermissionDto).optional(),
});

export type RoleDtoType = z.infer<typeof RoleDto>;
