import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from '../database/database.module';
import { getProcessEnv } from 'src/utils/env';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: getProcessEnv('SECRET'),
      signOptions: { expiresIn: '150s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}