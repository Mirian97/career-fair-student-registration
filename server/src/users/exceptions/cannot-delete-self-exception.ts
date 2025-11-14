import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteSelfException extends HttpException {
  constructor() {
    super(
      {
        message: 'Você não pode deletar sua própria conta',
        error: 'CANNOT_DELETE_SELF',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
