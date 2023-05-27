import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common'
import { Request, Response } from 'express';


@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const errorResponse = {
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            message: 'Error during validation'            
        };
        response.status(status).json(errorResponse);
    }
}