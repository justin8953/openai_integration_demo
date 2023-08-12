import { PureAbility, AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { User, Role, Permission, Chat, OpenAIModel } from '@prisma/client';
import { UserService } from 'src/features/user/user.service';
import { ActionDtoType, ResourceDtoType } from 'src/schema/role';

export type AppSubjects =
  | Subjects<{
      User: User;
      Role: Role;
      Permission: Permission;
      Chat: Chat;
      OpenAIModel: OpenAIModel;
    }>
  | 'all';
export type AppAbility = PureAbility<[ActionDtoType, AppSubjects], PrismaQuery>;
@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly userService: UserService) {}

  async createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[ActionDtoType, AppSubjects]>
    >(PureAbility as AbilityClass<AppAbility>);
    const permissions = await this.userService.permissions(user.id);
    const permissionMap = new Map<ResourceDtoType, ActionDtoType[]>();
    permissions.forEach((permission) => {
      const [resource, action] = permission.name.split('.') as [
        ResourceDtoType,
        ActionDtoType,
      ];
      if (resource === 'all') {
        permissionMap.set('all', ['write', 'read', 'update', 'delete']);
      } else {
        const actions = permissionMap.get(resource) || [];
        actions.push(action);
        permissionMap.set(resource, actions);
      }
    });
    if (permissionMap.has('all')) {
      permissionMap.get('all').forEach((action) => {
        can(action, 'all');
      });
    }
    if (permissionMap.has('user')) {
      permissionMap.get('user').forEach((action) => {
        can(action, 'User');
      });
    }
    if (permissionMap.has('role')) {
      permissionMap.get('role').forEach((action) => {
        can(action, 'Role');
        can(action, 'Permission');
      });
    }
    if (permissionMap.has('chat')) {
      permissionMap.get('chat').forEach((action) => {
        can(action, 'Chat');
      });
    }
    can('read', 'OpenAIModel');

    return build();
  }
}
