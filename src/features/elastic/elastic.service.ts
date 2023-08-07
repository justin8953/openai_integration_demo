import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { getProcessEnv } from 'src/utils/env';

@Injectable()
export class ElasticService extends Client {
  constructor() {
    super({
      node: getProcessEnv('ES_URL'),
    });
  }
}
