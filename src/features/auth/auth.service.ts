import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compareHash } from './utils';
import { loginDtoType } from 'src/schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.debug('validate user', username);
    const user = await this.userService.user({
      email: username,
    });
    const passwordMatch = await compareHash(password, user.passwordHash);
    if (user && passwordMatch) {
      console.debug('user found', username);
      return user;
    }
    console.error('user not found', username);
    return null;
  }

  async validateUserById(id: number, username: string, name: string) {
    const user = await this.userService.user({ id });
    if (
      user &&
      user.email === username &&
      `${user.firstName} ${user.lastName}` === name
    ) {
      console.debug('user found', username);
      return user;
    }
    console.error('user not found', username);
    return null;
  }
  async login(payload: loginDtoType) {
    const user = await this.userService.user({ email: payload.username });
    const claim = {
      email: user.email,
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
    };
    console.debug('claim', claim);
    return {
      access_token: this.jwtService.sign(claim),
    };
  }
}
