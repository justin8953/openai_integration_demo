import { SetMetadata } from '@nestjs/common';
import {
  AppAbility,
  AppSubjects,
} from './casl-ability.factory/casl-ability.factory';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}
type PolicyHandlerCallback = (ability: AppAbility) => boolean;
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

export class ReadPolicyHandler implements IPolicyHandler {
  constructor(private readonly subject: AppSubjects) {
    this.subject = subject;
  }
  handle(ability: AppAbility): boolean {
    return ability.can('read', this.subject);
  }
}
