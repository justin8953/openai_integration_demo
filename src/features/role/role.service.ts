import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Permissions } from 'src/schema/role';
import { DefaultRoles } from './role.constatns';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class RoleService implements OnModuleInit {
  async onModuleInit() {
    Permissions.forEach(async (permission) => {
      const match = await this.database.permission.findFirst({
        where: {
          name: permission,
        },
      });
      if (!match) {
        console.log('create new permission', permission);
        await this.database.permission.create({
          data: {
            name: permission,
          },
        });
      }
    });
    DefaultRoles.forEach(async (role) => {
      const match = await this.database.role.findFirst({
        where: {
          name: role.name,
        },
      });
      if (!match) {
        console.log('create new role', role.name);
        const permissions = await this.database.permission.findMany({
          where: {
            name: {
              in: role.permissions,
            },
          },
        });
        await this.database.role.create({
          data: {
            name: role.name,
            default: true,
            permissions: {
              connect: permissions,
            },
          },
        });
      }
    });
  }
  constructor(private readonly database: DatabaseService) {}

  // Retrieve permissions
  async permissions(params: {
    skip?: number;
    take?: number;
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
    });
  }
  // Create a role
  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.database.role.create({
      data,
    });
  }
  // Update a role
  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { where, data } = params;
    return this.database.role.update({
      data,
      where,
    });
  }
  // Delete a role
  async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    return this.database.role.delete({
      where,
    });
  }
}
