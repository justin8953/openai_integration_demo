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
import { UserService } from './user.service';
import { ChatTypeService } from '../chat-type/chat-type.service';
import { Prisma, User } from '@prisma/client';
import { UserDtoType } from 'src/schema';
import { generateHash } from '../auth/utils';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly chatTypeService: ChatTypeService,
  ) {}

  // Retrieve a single user
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async retrieveUser(@Param('userId') userId: number): Promise<User> {
    return this.userService.user({ id: Number(userId) });
  }

  // Retrieve multiple users
  @UseGuards(JwtAuthGuard)
  @Get()
  async retrieveUsers(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
  ): Promise<User[]> {
    return this.userService.users(query);
  }

  // Create a user
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() user: UserDtoType): Promise<User> {
    const passwordHash = await generateHash(user.password);
    return this.userService.createUser({
      email: user.email,
      passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  // Update a user
  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() user: UserDtoType,
  ): Promise<User> {
    const userExists = await this.userService.user({ id: Number(userId) });
    if (!userExists) {
      throw new Error('User not found');
    }
    return this.userService.updateUser({
      where: {
        id: Number(userId),
      },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        passwordHash: await generateHash(user.password),
      },
    });
  }

  // Delete a user
  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number): Promise<User> {
    return this.userService.deleteUser({
      id: Number(userId),
    });
  }
}
