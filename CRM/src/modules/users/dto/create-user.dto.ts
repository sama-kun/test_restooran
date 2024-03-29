import { UserEntity } from '@/database/entities/user.entity';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto extends PartialType(UserEntity) {}
