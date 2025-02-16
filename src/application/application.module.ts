import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from 'src/PrismaService';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService],
})
export class ApplicationModule {}
