import { Role } from 'src/roles/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: String, enum: Role, default: Role.Registrar })
  role: Role;
}
