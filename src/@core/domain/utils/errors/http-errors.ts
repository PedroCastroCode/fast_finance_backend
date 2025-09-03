import { HttpException } from '@nestjs/common';

export default class HttpError {
    message: any;
    constructor(message: any) {
        this.message = message;
    }
    BadRequest() {
        throw new HttpException(this.message, 400);
    }
    NotFound() {
        throw new HttpException(this.message, 404);
    }
}
