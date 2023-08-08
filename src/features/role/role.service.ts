import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Permission, Prisma, Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly database: DatabaseService) {}

  // Retrieve permissions
  async permissions(params: {
    skip?: number;
    take?: number;
    include?: Prisma.PermissionInclude;
    cursor?: Prisma.PermissionWhereUniqueInput;
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.database.permission.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  // Retrieve a single role
  async role(
    roleWhereUniqueInput: Prisma.RoleWhereUniqueInput,
  ): Promise<Role | null> {
    return this.database.role.findUnique({
      where: roleWhereUniqueInput,
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }
  // Retrieve multiple roles
  async roles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.database.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }
  // Create a role
  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.database.role.create({
      data,
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }
  // Update a role
  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { where, data } = params;
    const match = await this.database.role.findFirst({
      where,
    });
    if (!match) {
      throw new Error('Role not found');
    } else if (match.default) {
      throw new Error('Cannot update default role');
    }
    return this.database.role.update({
      data,
      where,
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }
  // Delete a role
  async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    const match = await this.database.role.findFirst({
      where,
    });
    if (!match) {
      throw new Error('Role not found');
    } else if (match.default) {
      throw new Error('Cannot delete default role');
    }
    return this.database.role.delete({
      where,
    });
  }

  async addPermissionsToRole(roleId: string, permissions: Permission[]) {
    return this.updateRole({
      where: {
        id: roleId,
      },
      data: {
        permissions: {
          create: permissions.map((permission) => ({
            permission: {
              connect: permission,
            },
          })),
        },
      },
    });
  }

  async deletePermissionsToRole(roleId: string, permissions: Permission[]) {
    return this.updateRole({
      where: {
        id: roleId,
      },
      data: {
        permissions: {
          deleteMany: permissions.map((permission) => ({
            permissionId: permission.id,
          })),
        },
      },
    });
  }
}
