import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsCPF } from 'src/decorators/is-cpf.decorator';
import { Grade } from '../entities/grade.enum';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsCPF({ message: 'CPF inválido' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsEnum(Grade)
  @IsNotEmpty()
  grade: Grade;

  @IsNumber()
  school: number;

  @IsString()
  desiredCourse: string;

  @IsString()
  observation: string;
}
