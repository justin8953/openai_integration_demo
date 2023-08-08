export const SystemAdmin = 'System Administrator';
export const AppAdmin = 'Application Administrator';
export const DefaultUser = 'Default';
export const DefaultRoles = [
  {
    name: SystemAdmin,
    permissions: ['all'],
  },
  {
    name: AppAdmin,
    permissions: [
      'user.read',
      'user.write',
      'user.update',
      'role.read',
      'role.write',
      'role.update',
      'role.delete',
      'chat.read',
      'chat.write',
      'chat.update',
      'chat.delete',
    ],
  },
  {
    name: DefaultUser,
    permissions: ['chat.read', 'chat.write', 'chat.update', 'chat.delete'],
  },
];
