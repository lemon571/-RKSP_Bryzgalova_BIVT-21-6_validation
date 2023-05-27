import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class InternalServerExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 510; //500
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            //message: exception.message
            message: exception.message && 'Error during validation'             
        };
        response.status(status).json(errorResponse);
    }
}