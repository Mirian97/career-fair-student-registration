import { HttpException, HttpStatus } from '@nestjs/common';

export class SchoolNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'Escola não encontrado',
        error: 'SCHOOL_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
