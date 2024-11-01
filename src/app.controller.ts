import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDescriptions, ApiResponses } from './main/constants/api.constants';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: ApiResponses.success200.status,
    description: ApiResponses.success200.description,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
