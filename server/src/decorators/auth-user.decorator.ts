import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export const AuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): User | null => {
    const request: Request = ctx.switchToHttp().getRequest();
    return (request['user'] as User) ?? null;
  },
);
