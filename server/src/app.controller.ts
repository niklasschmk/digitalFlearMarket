import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response): void {
    response.sendFile(path.resolve('../client/DigitalFlearMarketClient/dist/index.html'));
  }



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
