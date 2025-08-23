import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { taskViewService } from 'src/Providers/task.provider';
import { Task, taskView } from 'src/Entities/tasks';
import { UpdateResult } from 'typeorm';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
@UseGuards(ThrottlerGuard)
export class TaskController {
    constructor(private readonly TaskService: taskViewService) {}

    @SkipThrottle()
    @Get('all/:idAll')
    @ApiOperation({ summary: 'Get All Tasks Based in id' })
    @ApiResponse({
      status: 200,
      description: 'All Tasks Based in id',
      type: taskView,
    })
    @ApiResponse({ status: 404, description: 'Tasks not found.' })
    @HttpCode(200)
    public findAll(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllfromUID(id);
    }

    @SkipThrottle()
    @Get('allFinished/:idAll')
    @ApiOperation({ summary: 'Get All Finished Tasks Based in id' })
        @ApiResponse({
      status: 200,
      description: 'All Finished Tasks Based in id',
      type: taskView,
    })
    @ApiResponse({ status: 404, description: 'Finished Tasks not found.' })
    @HttpCode(200)
    public findAllFinished(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllFinishedFromUID(id);
    }

    @SkipThrottle()
    @Get('allCancelled/:idAll')
    @ApiOperation({ summary: 'Get All Cancelled Tasks Based in id' })
        @ApiResponse({
      status: 200,
      description: 'All Cancelled Tasks Based in id',
      type: taskView,
    })
    @ApiResponse({ status: 404, description: 'Canceled Tasks not found.' })
    @HttpCode(200)
    public findAllCancelled(@Param('idAll', ParseIntPipe) id: number):Promise<taskView[]>{
      return this.TaskService.getAllCancelledFromUID(id);
    }
    
    @Get(':idOne')
    @ApiOperation({ summary: 'Get One Specific Task Based in id' })
    @ApiResponse({
      status: 200,
      description: 'The Specific task record',
      type: taskView,
    })
    @ApiResponse({ status: 404, description: 'Canceled Tasks not found.' })
    @HttpCode(200)
    public findOne(@Param('idOne', ParseIntPipe) id: number): Promise<taskView> {
      return this.TaskService.getOneFromID(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({
      status: 201,
      description: 'The task has been successfully created.',
      type: taskView, 
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @HttpCode(201)
    public create(@Body() taskData: Partial<Task>){
      this.TaskService.createOne(taskData)
    }
  
    @Put(':id')
    @HttpCode(204)
    public update(@Param('id', ParseIntPipe) id: number, @Body() userData: Partial<Task>): Promise<Task> {
      return this.TaskService.update(id, userData);
    }

    @Put('finish/:id')
    @HttpCode(204)
    public finishTask(@Param('id', ParseIntPipe) id: number):Promise<UpdateResult>{
      return this.TaskService.finishTask(id);
    }
  
    @Delete(':id')
    @HttpCode(204)
    public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.TaskService.remove(id);
    }
}
