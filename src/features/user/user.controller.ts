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
import { Prisma, User } from '@prisma/client';
import { UserDtoType } from 'src/schema';
import { generateHash } from '../auth/utils';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleService } from '../role/role.service';
import { DefaultUser } from '../role/role.constants';
import { ChatModelService } from '../chat-model/chat-model.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleServices: RoleService,
    private readonly chatModelService: ChatModelService,
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
  private async getModel(model?: string) {
    if (model) {
      const match = await this.chatModelService.model({
        id: model,
      });
      if (match) {
        return match;
      }
    }
    return await this.chatModelService.model({
      id: 'gpt-3.5-turbo',
    });
  }
  private async getRoles(roles?: string[]) {
    if (roles && roles.length > 0) {
      const matchRoles = await this.roleServices.roles({
        where: {
          id: {
            in: roles,
          },
        },
      });
      return matchRoles;
    } else {
      return await this.roleServices.roles({
        where: { name: DefaultUser },
      });
    }
  }

  // Create a user
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() user: UserDtoType): Promise<User> {
    const passwordHash = await generateHash(user.password);
    const roles = await this.getRoles(user.roles);
    const defaultModel = await this.getModel(user.model);
    return this.userService.createUser({
      email: user.email,
      passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
      OpenAIModel: {
        connect: defaultModel,
      },
      roles: {
        create: roles.map((role) => ({
          role: {
            connect: role,
          },
        })),
      },
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

  @UseGuards(JwtAuthGuard)
  @Put(':userId/open-ai-model')
  async changePreferOpenAIModel(
    // @Request() { user }: any,
    @Param('userId') userId: number,
    @Body() { modelId }: { modelId: string },
  ) {
    const match = await this.chatModelService.model({
      id: modelId,
    });
    if (!match) {
      throw new Error('Model not found');
    }
    return this.userService.updateUser({
      where: {
        id: Number(userId),
      },
      data: {
        OpenAIModel: {
          connect: {
            id: modelId,
          },
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/roles')
  async GetUserRoles(@Param('userId') userId: number) {
    return this.userService.user({ id: Number(userId) });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/roles')
  async AddUserRoles(
    @Param('userId') userId: number,
    @Body() { roles }: { roles: string[] },
  ) {
    const newRoles = await this.roleServices.roles({
      where: {
        id: {
          in: roles,
        },
        users: {
          none: {
            userId: userId,
          },
        },
      },
    });
    return this.userService.addRoles(userId, newRoles);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/roles/delete')
  async DeleteUserRoles(
    @Param('userId') userId: number,
    @Body() { roles }: { roles: string[] },
  ) {
    const existedRoles = await this.roleServices.roles({
      where: {
        id: {
          in: roles,
        },
        users: {
          none: {
            userId: userId,
          },
        },
      },
    });
    return this.userService.deleteRoles(userId, existedRoles);
  }
}
