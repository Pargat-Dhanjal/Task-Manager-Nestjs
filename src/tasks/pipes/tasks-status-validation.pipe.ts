import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.emum';

export class TasksStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isValidTask(value)) {
      throw new BadRequestException(`'${value}' is not a valid status`);
    }
    return value;
  }

  private isValidTask(status: any) {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
