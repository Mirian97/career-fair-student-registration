import { PartialType } from '@nestjs/mapped-types';
import { IsCPF } from 'src/decorators/is-cpf.decorator';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsCPF({ message: 'CPF inválido' })
  cpf?: string;
}
