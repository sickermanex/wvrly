import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDataEntity } from './db/entities/user_data.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<UserDataEntity[]> {
    return await this.appService.getAll();
  }

  @Get('/search-by-radio')
  async getData(@Query() params: any): Promise<UserDataEntity[]> {
    const {
      lat,
      lon,
      radio
    } = params;

    return await this.appService.getData(lat, lon, radio);
  }

  @Post()
  async postUserData(@Body() userData: Partial<UserDataEntity>): Promise<UserDataEntity> {
    return this.appService.postUserData(userData)
  }
}
