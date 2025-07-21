import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal Server Error';

    if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = `${exception.meta?.target} already exist`;
    } else if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = (exception.meta?.cause as string) || 'Record not found';
    }

    res.status(status).json({ message: message, statusCode: status });
  }
}
