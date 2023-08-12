import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { UserService } from '../user/user.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [CaslAbilityFactory, UserService, DatabaseService],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
