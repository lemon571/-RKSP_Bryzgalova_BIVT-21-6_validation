import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super('You are forbidden to access the endpoint', HttpStatus.FORBIDDEN);
    }
}