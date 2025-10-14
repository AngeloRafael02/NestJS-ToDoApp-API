import { Controller, Get, Header, HttpCode, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { miscPrefix } from 'src/app.enums';
import { Categories } from 'src/Entities/categories';
import { Conditions } from 'src/Entities/conditions';
import { Threats } from 'src/Entities/threats';
import { miscService } from 'src/Providers/misc.provider';
import { statsService } from 'src/Providers/stats.provider';

@ApiTags('misc')
@Controller(miscPrefix.main)
@UseGuards(ThrottlerGuard)
export class MiscController {
    constructor(
        private miscService:miscService,
        private statsService:statsService
    ){}

  @ApiOperation({ summary: 'Get all categories. Used Mostly for Categories Selections' })
  @ApiResponse({
    status: 200,
    description: 'A list of Categories.',
    type: [Categories],
  })
  @Get(miscPrefix.allCat)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=3600')
  public getCategories(): Promise<Categories[]>{
    return this.miscService.findAllCat();
  }

  @ApiOperation({ summary: 'Get all conditions/status, Used mostly for Status Selections' })
  @ApiResponse({
    status: 200,
    description: 'A list of conditions/status.',
    type: [Conditions],
  })
  @Get(miscPrefix.allCond)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=3600')
  public getConsditions():Promise<Conditions[]>{
    return this.miscService.findAllCond();
  }

  @ApiOperation({ summary: 'Get all Threats Levels, Used mostly for Threat Level Selections' })
  @ApiResponse({
    status: 200,
    description: 'A list of conditions/status.',
    type: [Conditions],
  })
  @Get(miscPrefix.allThreats)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=3600')
  public getThreats():Promise<Threats[]>{
    return this.miscService.findAllThreats();
  }

  @ApiOperation({ summary: 'Gets all Column names for task Table, Used mostly for Table Headers' })
  @ApiResponse({
    status: 200,
    description: 'A list of Column Names.',
    type: [String],
  })
  @Get(`col/:table`)
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=300')
  public getColumnHeaders(@Param('table') table:string){
    return this.miscService.getColumnNames(table);
  }

  @ApiOperation({ summary: 'Gets Count of Tasks Depending based on Categories' })
  @ApiResponse({
    status: 200,
    description: 'Count of Task depending on Categories',
  })
  @Get('catGrouped/:id')
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=60')
  public getTaskCategoryGrouped(@Param('id', ParseIntPipe) id:number){
    return this.statsService.getCategoryGrouped(id);
  }

  @ApiOperation({ summary: 'Gets Count of Tasks Depending based on Conditions' })
  @ApiResponse({
    status: 200,
    description: 'Count of Task depending on Conditions',
  })
  @Get('statGrouped/:id')
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=60')
  public getTaskStatusGrouped(@Param('id', ParseIntPipe) id:number){
    return this.statsService.getConditionGrouped(id);
  }

  @ApiOperation({ summary: 'Gets Count of Tasks Depending based on Threat Level' })
  @ApiResponse({
    status: 200,
    description: 'Count of Task depending on Threat Level',
  })
  @Get('threatGrouped/:id')
  @HttpCode(200)
  @Header('Cache-Control', 'public, max-age=60')
  public getTaskThreatLevelGrouped(@Param('id', ParseIntPipe) id:number){
    return this.statsService.getThreatLevelGrouped(id);
  }

}
