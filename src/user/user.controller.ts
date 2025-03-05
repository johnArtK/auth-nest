import {
  Controller,
  Get,
  Patch,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/dto/register.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Получить всех юзеров' })
  @ApiResponse({ status: 200, description: 'Юзеры успешно возвращены.' })
  @ApiBody({ type: RegisterDto })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Получить данные профиля пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Данные профиля пользователя успешно возвращены.',
  })
  async getProfile(@Request() req) {
    const user = await this.userService.findById(req.user.userId);
    const { password, ...userData } = user;
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('favorites')
  @ApiOperation({ summary: 'Обновить избранные товары пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'number', example: 123 },
      },
      required: ['productId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Избранные товары успешно обновлены.',
  })
  async updateFavorites(@Request() req, @Body() body: { productId: number }) {
    const updatedUser = await this.userService.toggleFavorite(
      req.user.userId,
      body.productId
    );

    return { favoriteProducts: updatedUser.favoriteProducts };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cart')
  @ApiOperation({ summary: 'Обновить товары в корзине пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product: {
          type: 'object',
          properties: {
            productId: { type: 'number', example: 456 },
            quantity: { type: 'number', example: 2 },
          },
          required: ['productId', 'quantity'],
        },
      },
      required: ['product'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Товары в корзине успешно обновлены.',
  })
  async updateCart(
    @Request() req,
    @Body() body: { product: { productId: number; quantity: number } }
  ) {
    const updatedUser = await this.userService.toggleCartItem(
      req.user.userId,
      body.product.productId,
      body.product.quantity
    );
    return { cartProducts: updatedUser.cartProducts };
  }
}
