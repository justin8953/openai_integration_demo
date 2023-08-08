import { Injectable, OnModuleInit } from '@nestjs/common';
import { DefaultRoles, SystemAdmin } from './features/role/role.constants';
import { Permissions } from 'src/schema/role';

import { DatabaseService } from './features/database/database.service';
import { getProcessEnv } from './utils/env';
import { generateHash } from './features/auth/utils';
import { OpenaiService } from './features/openai/openai.service';
import { ChatModelService } from './features/chat-model/chat-model.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly database: DatabaseService,
    private readonly chatModelService: ChatModelService,
    private readonly openaiService: OpenaiService,
  ) {}
  async insertOpenAIModels() {
    const { data } = await this.openaiService.listModels();
    return Promise.all(
      data.data.map(async (model) => {
        const existedModel = await this.chatModelService.model({
          id: model.id,
        });
        if (!existedModel) {
          console.log('create new model', model.id);
          return await this.chatModelService.createModel({
            id: model.id,
            object: model.object,
            created: model.created,
            owned_by: model.owned_by,
          });
        }
        return existedModel;
      }),
    );
  }
  async insertPermissions() {
    return Promise.all(
      Permissions.map(async (permission) => {
        const match = await this.database.permission.findFirst({
          where: {
            name: permission,
          },
        });
        if (!match) {
          console.log('create new permission', permission);
          return await this.database.permission.create({
            data: {
              name: permission,
            },
          });
        }
        return match;
      }),
    );
  }

  async insertDefaultRoles() {
    return Promise.all(
      DefaultRoles.map(async (role) => {
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
          return await this.database.role.create({
            data: {
              name: role.name,
              default: true,
              permissions: {
                create: permissions.map((permission) => {
                  return {
                    permission: {
                      connect: permission,
                    },
                  };
                }),
              },
            },
          });
        }
        return match;
      }),
    );
  }
  async insertDefaultUser() {
    const email = getProcessEnv('ADMIN_EMAIL', 'admin@example.com');
    const user = await this.database.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      console.debug('create admin user');
      const password = getProcessEnv('ADMIN_PASSWORD', 'example');
      const passwordHash = await generateHash(password);
      const adminRole = await this.database.role.findFirst({
        where: {
          name: SystemAdmin,
        },
      });
      const openAIModel = await this.database.openAIModel.findFirst({
        where: {
          id: 'gpt-3.5-turbo',
        },
      });
      await this.database.user.create({
        data: {
          email: email,
          firstName: 'Admin',
          lastName: 'User',
          passwordHash: passwordHash,
          OpenAIModel: {
            connect: openAIModel,
          },
          roles: {
            create: [
              {
                role: {
                  connect: adminRole,
                },
              },
            ],
          },
        },
      });
    }
  }
  async onModuleInit() {
    await this.insertOpenAIModels();
    await this.insertPermissions();
    await this.insertDefaultRoles();
    await this.insertDefaultUser();
  }
  getHello(): string {
    return 'Hello World!';
  }
}
