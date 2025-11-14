import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'Estudante não encontrado',
        error: 'STUDANT_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
