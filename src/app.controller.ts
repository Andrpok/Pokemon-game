import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
const client = require('prom-client');
const register = client.register;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/metrics')
  @Header('content-type', register.contentType)
  getMetrics(): string {
    try {
      return register.metrics();
    } catch (ex) {
      return ex;
    }
  }
}
