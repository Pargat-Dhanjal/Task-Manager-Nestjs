import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.emum';
import { createTaskDto } from './dto/create-task.dto';
import { getTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: getTaskFilterDto) {
    return this.taskService.getAllTask(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  patchTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TasksStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.patchTaskById(id, status);
  }
}
