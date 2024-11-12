import ErrorCodes from '../enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class ForbiddenError extends HttpException {
  constructor(
    public description = 'Forbidden',
    public code = ErrorCodes.GENERIC,
  ) {
    super(
      { message: description, code, statusCode: HttpStatus.FORBIDDEN },
      HttpStatus.FORBIDDEN,
    );
  }
}
