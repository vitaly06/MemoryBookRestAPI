import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly clientId = 31; 
  private readonly clientSecret = '2OVdocElXSN6G7XLmoX2Vd3uh0fbsVq1FfDTugKZ'; 
  private readonly redirectUri = 'https://hackathon-12.orb.ru/profile/login_from_rsaag';

  constructor(private readonly httpService: HttpService) {}

  async getAuthorizationUrl(state: string): Promise<string> {
    const scope = encodeURIComponent('email+auth_method');
    return `https://lk.orb.ru/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=${scope}&state=${encodeURIComponent(state)}`;
  }

  async getTokens(code: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.post('https://lk.orb.ru/oauth/token', {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      code: code,
      grant_type: 'authorization_code',
    }));

    return response.data; //access_token и refresh_token
  }

  async getUserData(accessToken: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get('https://lk.orb.ru/api/get_user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        scope: 'email+auth_method',
      },
    }));

    return response.data; 
  }
}
//rsaag_id+personal_data+esia_data+email+phone+esia_user_id+organizations_user+auth_method