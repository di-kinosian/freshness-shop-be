import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiDescriptions } from './api.descriptions';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: ApiDescriptions.GET_HELLO })
  getHello(): string {
    return this.appService.getHello();
  }
}
