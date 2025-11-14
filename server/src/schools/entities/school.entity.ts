import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Student, (student) => student.school)
  students: Student[];
}
