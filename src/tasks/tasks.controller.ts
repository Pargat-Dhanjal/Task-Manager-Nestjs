import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { createTaskDto } from './dto/create-task.dto';
import { getTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterGto: getTaskFilterDto): Task[] {
    if (Object.keys(filterGto).length) {
      return this.taskService.getTaskFilter(filterGto);
    }
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/:type')
  patchTaskById(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body('value') value: string,
  ): Task {
    return this.taskService.patchTaskById(id, type, value);
  }
}
