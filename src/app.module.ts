import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HeroesController } from './heroes.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, HttpModule, AuthModule],
  controllers: [HeroesController],
  providers: [AppService]
})
export class AppModule {}
