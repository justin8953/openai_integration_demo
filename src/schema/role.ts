import { z } from 'zod';
export const ActionDto = z.enum(['read', 'write', 'update', 'delete'] as const);
export type ActionDtoType = z.infer<typeof ActionDto>;
export const ResourceDto = z.enum(['all', 'user', 'role', 'chat'] as const);
export type ResourceDtoType = z.infer<typeof ResourceDto>;
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
});

export type RoleDtoType = z.infer<typeof RoleDto>;
