import { Role } from 'src/roles/enums/roles.enum';
import { User } from 'src/users/entities/user.entity';

export type JwtPayload = {
  id: number;
  name: string;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: Omit<User, 'password'>;
};
