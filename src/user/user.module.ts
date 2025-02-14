import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/PrismaService';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/JwtStrategy';

@Module({
  imports: [

    JwtModule.register({
        secret: process.env.JWT_SECRET || 'defaultSecret', 
        signOptions: { expiresIn: '30d' }, 

    }),

],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
})
export class UserModule {}
