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
import { PermissionDtoType, RoleDtoType } from 'src/schema/role';

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
    return this.roleService.createRole({
      name: role.name,
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
    return this.roleService.updateRole({
      where: {
        id: roleId,
      },
      data: {
        name: role.name,
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

  // Add permissions to a role
  @UseGuards(JwtAuthGuard)
  @Post(':roleId/permissions')
  async addPermissionsToRole(
    @Param('roleId') roleId: string,
    @Body()
    body: {
      permissions: PermissionDtoType[];
    },
  ): Promise<Role> {
    const newPermission = await this.roleService.permissions({
      where: {
        name: {
          in: body.permissions,
        },
        roles: {
          none: {
            roleId,
          },
        },
      },
    });

    return this.roleService.updateRole({
      where: {
        id: roleId,
      },
      data: {
        permissions: {
          create: newPermission.map((permission) => ({
            permission: {
              connect: permission,
            },
          })),
        },
      },
    });
  }

  // Add permissions to a role
  @UseGuards(JwtAuthGuard)
  @Post(':roleId/permissions/delete')
  async deletePermissionsToRole(
    @Param('roleId') roleId: string,
    @Body()
    body: {
      permissions: PermissionDtoType[];
    },
  ): Promise<Role> {
    const existedPermission = await this.roleService.permissions({
      where: {
        name: {
          in: body.permissions,
        },
        roles: {
          some: {
            roleId,
          },
        },
      },
      include: {
        roles: true,
      },
    });

    return this.roleService.updateRole({
      where: {
        id: roleId,
      },
      data: {
        permissions: {
          deleteMany: existedPermission.map((permission) => ({
            permissionId: permission.id,
          })),
        },
      },
    });
  }
}
