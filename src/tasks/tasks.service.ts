import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.emum';
import { createTaskDto } from './dto/create-task.dto';
import { getTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getAllTask(filterDto: getTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto);
  }

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task)
      throw new NotFoundException(`Task with id '${id}' is not found!`);

    return task;
  }

  async deleteTaskById(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(id);
    return task;
  }

  async patchTaskById(id: number, value: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = value;
    await task.save();
    return task;
  }
}

// stores the actuall bussiness logic
