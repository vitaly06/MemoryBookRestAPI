import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from './PrismaService';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private readonly prisma: PrismaService) {}

  async getResourceFeatures() {
    const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
    const headers = {
      Accept: '*/*',
      Authorization: auth,
    };
  
    try {
      const response = await this.httpService.get(`https://geois2.orb.ru/api/resource/8860/feature/`, { headers }).toPromise();
      
      if (!response || !response.data) {
        throw new Error('No data received from the API');
      }
  
      const res = response.data;
  
      if (!Array.isArray(res)) {
        throw new Error('Response data is not an array');
      }
  
      const n_raionValues = Array.from(new Set(res.map(item => item.fields.n_raion)));
      const kontraktValues = Array.from(new Set(res.map(item => item.fields.kontrakt)));
  
      return {
        n_raion: n_raionValues,
        kontrakt: kontraktValues,
      };
    } catch (error) {
      // Логирование ошибки с дополнительной информацией
      console.error('Error fetching resource features:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw new Error('Failed to fetch resource features');
    }
  }

  async addPerson(personData: any){
    const {num, n_raion, fio, years, info, kontrakt, nagrads} = {...personData.fields}
    const geom = personData.geom
    const application = this.prisma.application.create({
      data: {
        num, n_raion, fio, years, info, kontrakt, nagrads, geom
      }
    })
    return application
  }

  
}