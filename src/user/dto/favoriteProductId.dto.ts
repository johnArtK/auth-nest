// import { ApiProperty } from '@nestjs/swagger';

// export class FavoriteProductIdDto {
//   @ApiProperty({
//     example: { productId: 43 },
//   })
//   productId: number;
// }
import { IsDefined, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class FavoriteProductIdDto {
  @IsDefined({ message: 'Свойство productId обязательно' })
  @IsNotEmpty({ message: 'Свойство productId не должно быть пустым' })
  productId: number;

  // @IsDefined({ message: 'Свойство email обязательно' })
  // @IsNotEmpty({ message: 'Свойство email не должно быть пустым' })
  // @IsEmail({}, { message: 'Некорректный формат email' })
  // readonly email: string;
}