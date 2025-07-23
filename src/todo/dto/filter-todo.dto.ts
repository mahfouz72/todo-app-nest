import { $Enums } from '../../../generated/prisma';
import Status = $Enums.Status;
import Priority = $Enums.Priority;
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class FilterTodoDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  @IsDateString()
  dueAfter: string;

  @IsOptional()
  @IsDateString()
  dueBefore: string;
}