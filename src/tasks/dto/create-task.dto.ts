import { IsNotEmpty } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

// data tranfer object is passed around to avoid parameter mismatch
