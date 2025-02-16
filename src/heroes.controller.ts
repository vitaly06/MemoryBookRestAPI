import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpService } from '@nestjs/axios';

@Controller("hero")
export class HeroesController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService) {}

  @Get('getFilters')
  async getResourceFeatures() {
    return this.appService.getResourceFeatures();
  }

  @Post()
  async filterFeatures(
    @Query('n_raion') n_raion: string,
    @Query('kontrakt') kontrakt: string,
    @Body() filters: any,
  ) {
    const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
    const headers = {
      Accept: '*/*',
      Authorization: auth,
    };

    try {
      const response = await this.httpService.get(`https://geois2.orb.ru/api/resource/8860/feature/`, { headers }).toPromise();
      const res = response.data;

      const filteredData = res.filter(item => {
        const matchesNraion = !n_raion || n_raion.split(',').includes(item.fields.n_raion);
        const matchesKontrakt = !kontrakt || kontrakt.split(',').includes(item.fields.kontrakt);
        return matchesNraion && matchesKontrakt;
      });

      return filteredData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('search')
  async searchByFio(@Query('fio') fio: string) {
    const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
    const headers = {
      Accept: '*/*',
      Authorization: auth,
    };

    try {
      const response = await this.httpService.get(`https://geois2.orb.ru/api/resource/8860/feature/`, { headers }).toPromise();
      const res = response.data;

      
      const filteredData = res.filter(item => 
        item.fields.fio && item.fields.fio.toLowerCase().includes(fio.toLowerCase())
      );

      return filteredData; 
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  }
}