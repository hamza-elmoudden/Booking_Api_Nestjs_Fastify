import { Controller, Get,Request, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get()
  getHello(@Request() req): string {
    return this.appService.getHello();
  }
}
