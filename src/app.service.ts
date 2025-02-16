import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getResourceFeatures() {
    const auth = 'Basic ' + Buffer.from('hackathon_36:hackathon_36_25').toString('base64');
    const headers = {
      Accept: '*/*',
      Authorization: auth,
    };

    try {
      const response = await this.httpService.get(`https://geois2.orb.ru/api/resource/8860/feature/`, { headers }).toPromise();
      const res = response.data;

      
      const n_raionValues = Array.from(new Set(res.map(item => item.fields.n_raion)));
      const kontraktValues = Array.from(new Set(res.map(item => item.fields.kontrakt)));


      return {
        n_raion: n_raionValues,
        kontrakt: kontraktValues,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
}