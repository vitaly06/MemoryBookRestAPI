import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Redirect()
  async login() {
    const url = await this.authService.getAuthorizationUrl();
    return { url }; 
  }

  @Get('redirect')
  async redirect(@Query('code') code: string) {
    const tokens = await this.authService.getTokens(code);
    const userData = await this.authService.getUserData(tokens.access_token);
    
    return userData; 
  }
}