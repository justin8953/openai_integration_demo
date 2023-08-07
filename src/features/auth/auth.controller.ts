import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { loginDtoType } from 'src/schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: loginDtoType) {
    return this.authService.login(payload);
  }
}
