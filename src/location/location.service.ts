import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorMessages } from 'src/main/constants/messages.constants';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://countriesnow.space/api/v0.1/countries/capital',
        ),
      );

      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || ErrorMessages.FAILED_FETCH_COUNTRIES,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCitiesByCountry(country: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://countriesnow.space/api/v0.1/countries/cities',
          { country },
        ),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || ErrorMessages.FAILED_FETCH_CITIES,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
