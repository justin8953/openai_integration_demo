import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, Role } from '@prisma/client';

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
