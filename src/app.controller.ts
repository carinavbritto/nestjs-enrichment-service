import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Enrichment Service API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        users: '/users/enriched/:uuid',
      },
    };
  }
}
