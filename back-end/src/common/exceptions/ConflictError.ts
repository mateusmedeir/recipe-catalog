import ErrorCodes from '../enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class ConflictError extends HttpException {
  constructor(
    public description = 'Conflict',
    public code = ErrorCodes.GENERIC,
  ) {
    super(
      { message: description, code, statusCode: HttpStatus.CONFLICT },
      HttpStatus.CONFLICT,
    );
  }
}
