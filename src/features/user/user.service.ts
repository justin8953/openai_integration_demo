import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
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
