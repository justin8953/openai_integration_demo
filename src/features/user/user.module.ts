import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { RoleModule } from '../role/role.module';

@Module({
  exports: [UserService],
  imports: [DatabaseModule, RoleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
