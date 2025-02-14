import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUser, RegisterUser } from './user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
    async register(@Body() data: RegisterUser){
      if (data.password != data.repassword){
        throw new HttpException("Пароли не совпадают", HttpStatus.BAD_REQUEST)
      }
      if (await this.userService.checkRegister(data.email, data.phoneNumber) == false){
        throw new HttpException("Пользователь с таким логином или почтой уже зарегистрирован", HttpStatus.BAD_REQUEST)
      }
      this.userService.register(data)
    }

  @Post("login")
  async login(@Body() data: LoginUser, @Res({passthrough: true}) response: Response){
    const token = await this.userService.login(data)
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    return {message: "Успешная авторизация"}
  }
}
