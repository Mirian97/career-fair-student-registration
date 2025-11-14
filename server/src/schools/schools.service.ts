import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entities/school.entity';
import { SchoolNotFoundException } from './exceptions/school-not-found.exception';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    return await this.schoolRepository.save(createSchoolDto);
  }

  async findAll() {
    return await this.schoolRepository.find();
  }

  async findOne(id: number) {
    const school = await this.schoolRepository.findOneBy({ id });
    if (!school) {
      throw new SchoolNotFoundException();
    }
    return school;
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    await this.schoolRepository.update(id, updateSchoolDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.schoolRepository.delete(id);
  }
}
