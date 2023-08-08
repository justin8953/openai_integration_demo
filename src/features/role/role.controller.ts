import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Permission, Prisma, Role } from '@prisma/client';
import { RoleDtoType } from 'src/schema/role';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // Retrieve multiple permissions
  @UseGuards(JwtAuthGuard)
  @Get('permissions')
  async retrievePermissions(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PermissionWhereUniqueInput;
      where?: Prisma.PermissionWhereInput;
      orderBy?: Prisma.PermissionOrderByWithRelationInput;
    },
  ): Promise<Permission[]> {
    return this.roleService.permissions(query);
  }
  // Retrieve a single role
  @UseGuards(JwtAuthGuard)
  @Get(':roleId')
  async retrieveRole(@Param('roleId') roleId: string): Promise<Role> {
    return this.roleService.role({ id: roleId });
  }

  // Retrieve multiple roles
  @UseGuards(JwtAuthGuard)
  @Get()
  async retrieveRoles(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.RoleWhereUniqueInput;
      where?: Prisma.RoleWhereInput;
      orderBy?: Prisma.RoleOrderByWithRelationInput;
    },
  ): Promise<Role[]> {
    return this.roleService.roles(query);
  }

  // Create a role
  @UseGuards(JwtAuthGuard)
  @Post()
  async createRole(@Body() role: RoleDtoType): Promise<Role> {
    const permissions = await this.roleService.permissions({
      where: {
        name: {
          in: role.permissions,
        },
      },
    });
    return this.roleService.createRole({
      name: role.name,
      permissions: {
        connect: permissions,
      },
    });
  }

  // Update a role
  @UseGuards(JwtAuthGuard)
  @Put(':roleId')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() role: RoleDtoType,
  ): Promise<Role> {
    const roleExists = await this.roleService.role({ id: roleId });
    if (!roleExists) {
      throw new Error('Role not found');
    }
    const permissions = await this.roleService.permissions({
      where: {
        name: {
          in: role.permissions,
        },
      },
    });
    return this.roleService.updateRole({
      where: {
        id: roleId,
      },
      data: {
        name: role.name,
        permissions: {
          connect: permissions,
        },
      },
    });
  }

  // Delete a role
  @UseGuards(JwtAuthGuard)
  @Delete(':roleId')
  async deleteRole(@Param('roleId') roleId: string): Promise<Role> {
    return this.roleService.deleteRole({
      id: roleId,
    });
  }
}
