import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post("accessApplication/:id")
  async accessApplication(@Param("id") id: number){
    this.applicationService.accessApplication(id)
  }

  @Post("denied/:id")
  async deniedApplication(@Param("id") id: number){
    this.applicationService.deniedApplication(id)
  }

  @Get("all")
  async getAllApplications(){
    return this.applicationService.allApplications()
  }
}
