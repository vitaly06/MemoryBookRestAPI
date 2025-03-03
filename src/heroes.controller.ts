import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpService } from '@nestjs/axios';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from "rxjs";

@ApiTags('hero') // Тег для группировки в Swagger
@Controller("hero")
export class HeroesController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService) {}


  @Get('getFilters')
  @ApiOperation({ summary: 'Получить фильтры' })
  async getResourceFeatures() {
    return await this.appService.getResourceFeatures();
  }


  @Get(':id')
  async getPersonById(@Param('id') id: number) {
    const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
    const headers = {
      Accept: '*/*',
      Authorization: auth,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://geois2.orb.ru/api/resource/8860/feature/${id}`, { headers })
      );
      return response.data; 
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  
  @Get()
@ApiOperation({ summary: 'Фильтрация данных по n_raion и kontrakt' })
@ApiQuery({ name: 'n_raion', required: false, description: 'Фильтр по району' })
@ApiQuery({ name: 'kontrakt', required: false, description: 'Фильтр по контракту' })
async filterFeatures(
  @Query('n_raion') n_raion: string,
  @Query('kontrakt') kontrakt: string,
) {
  const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
  const headers = {
    Accept: '*/*',
    Authorization: auth,
  };

  try {
    const response = await this.httpService.get(`https://geois2.orb.ru/api/resource/8860/feature/`, { headers }).toPromise();
    const res = response.data;

    if (!res || !Array.isArray(res)) {
      throw new Error('Invalid response data');
    }

    console.log('Received filters:', { n_raion, kontrakt });
    console.log('Response data:', res);

    const filteredData = res.filter(item => {
      const matchesNraion = !n_raion || n_raion.split(',').includes(item.fields.n_raion);
      const matchesKontrakt = !kontrakt || kontrakt.split(',').includes(item.fields.kontrakt);
      return matchesNraion && matchesKontrakt;
    });

    return filteredData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new HttpException('Failed to fetch data', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Get('search')
  @ApiOperation({ summary: 'Поиск по FIO' })
  @ApiQuery({ name: 'fio', required: true, description: 'ФИО для поиска' })
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

 @Post('addPerson')
  async addPerson(@Body() personData: any) {
    this.appService.addPerson(personData)
  }
}