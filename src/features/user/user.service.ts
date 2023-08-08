import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, User } from '@prisma/client';
import { getProcessEnv } from 'src/utils/env';
import { generateHash } from '../auth/utils';
import { SystemAdmin } from '../role/role.constatns';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
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

      await this.database.user.create({
        data: {
          email: email,
          firstName: 'Admin',
          lastName: 'User',
          passwordHash: passwordHash,
          roles: {
            connect: adminRole,
          },
        },
      });
    }
  }
  constructor(private database: DatabaseService) {}
  // Retrieve a single user
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.database.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  // Retrieve multiple users
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.database.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  // Create a user
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.database.user.create({
      data,
    });
  }
  // Update a user
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.database.user.update({
      data,
      where,
    });
  }
  // Delete a user
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.database.user.delete({
      where,
    });
  }
}
