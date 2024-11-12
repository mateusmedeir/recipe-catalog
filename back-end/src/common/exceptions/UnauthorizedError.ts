import ErrorCodes from '../enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class UnauthorizedError extends HttpException {
  constructor(
    public description = 'Unauthorized',
    public code = ErrorCodes.GENERIC,
  ) {
    super(
      { message: description, code, statusCode: HttpStatus.UNAUTHORIZED },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
