import {
  Body,
  Controller,
  Post,
  UseGuards,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common';

import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { ReportDto } from './dtos/report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { User } from '../users/user.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptors';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approvedReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeAppoval(Number(id), body.approved);
  }

  @Get('')
  getEstimate(@Query() query: GetEstimateDto) {
    // console.log(query);
    return this.reportService.createEstimate(query);
  }
}
