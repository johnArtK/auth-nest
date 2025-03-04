import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'newuser@example.com',
    description: 'Email нового пользователя',
  })
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Пароль нового пользователя',
  })
  password: string;

  @ApiProperty({
    example: 'Alex',
  })
  userName: string;

  @ApiProperty({
    example: '+64332566788',
  })
  phone: string;
}
