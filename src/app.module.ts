import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HeroesController } from './heroes.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './PrismaService';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [UserModule, HttpModule, AuthModule, ApplicationModule],
  controllers: [HeroesController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
