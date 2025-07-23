import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { $Enums } from '../../../generated/prisma';
import Status = $Enums.Status;
import Priority = $Enums.Priority;

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Status)
  status: Status;

  @IsEnum(Priority)
  priority: Priority;

  @IsDateString()
  dueDate: Date;
}
