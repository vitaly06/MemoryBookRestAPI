import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Redirect()
  async login(@Query('state') state: string) {
    const url = await this.authService.getAuthorizationUrl(state);
    return { url }; // Перенаправление на URL авторизации
  }

  @Get('redirect')
  async redirect(@Query('code') code: string) {
    const tokens = await this.authService.getTokens(code);
    const userData = await this.authService.getUserData(tokens.access_token);
    
    // Здесь вы можете обработать данные пользователя, например, сохранить их в сессии или базе данных
    return userData; // Возвращает данные о гражданине
  }
}