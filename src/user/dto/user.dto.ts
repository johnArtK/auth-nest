import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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

  @ApiProperty({
    example: 'Admin',
  })
  role: string;

  @ApiProperty({
    example: [1, 54],
  })
  favoriteProducts: number[];

  @ApiProperty({
    example: [{ id: 3, quantity: 2 }],
  })
  cartProducts: { id: number; quantity: number }[];
}
