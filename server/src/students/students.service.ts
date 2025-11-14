import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentNotFoundException } from './exceptions/student-not-found.exception';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.studentRepository.save({
      ...createStudentDto,
      school: { id: createStudentDto.school },
    });
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new StudentNotFoundException();
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.studentRepository.update(id, {
      ...updateStudentDto,
      school: { id: updateStudentDto.school },
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.studentRepository.delete(id);
  }
}
