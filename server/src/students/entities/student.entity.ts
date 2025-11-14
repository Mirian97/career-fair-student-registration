import { School } from 'src/schools/entities/school.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Grade } from './grade.enum';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({ unique: true, type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  cpf: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ type: 'date', nullable: false })
  birthDate: string;

  @Column({
    type: String,
    enum: Grade,
    nullable: false,
    default: Grade.ThirdHighSchool,
  })
  grade: string;

  @ManyToOne(() => School, (school) => school.students, {
    nullable: false,
    eager: true,
  })
  school: School;
  @Column({ type: 'text' })
  desiredCourse: string;

  @Column({ type: 'text' })
  observation: string;
}
