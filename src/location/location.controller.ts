import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { GetCitiesDto } from './dto/get-cities.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly LocationService: LocationService) {}

  @Get('countries')
  async getCountries() {
    return this.LocationService.getCountries();
  }

  @Post('cities')
  async getCitiesByCountry(@Body() getCitiesDto: GetCitiesDto) {
    return this.LocationService.getCitiesByCountry(getCitiesDto.country);
  }
}
