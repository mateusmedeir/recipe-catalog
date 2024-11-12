import ErrorCodes from '../enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class NotFoundError extends HttpException {
  constructor(
    public description = 'Request Not Found',
    public code = ErrorCodes.GENERIC,
  ) {
    super(
      { message: description, code, statusCode: HttpStatus.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }
}
