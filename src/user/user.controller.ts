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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.userService.findById(req.user.userId);
    const { password, ...userData } = user;
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('favorites')
  async updateFavorites(@Request() req, @Body() body: { productId: number }) {
    const updatedUser = await this.userService.toggleFavorite(
      req.user.userId,
      body.productId
    );

    return { favoriteProducts: updatedUser.favoriteProducts };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cart')
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
