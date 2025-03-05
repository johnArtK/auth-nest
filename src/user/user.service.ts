import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUsers() {
    return await this.usersRepository.findAndCount()
  }

  async create(user: Partial<User>): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findByUsername(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.findById(id);
  }

  async toggleFavorite(userId: number, productId: number): Promise<User> {
    const user = await this.findById(userId);
    let favorites = user.favoriteProducts || [];

    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
    } else {
      favorites.push(productId);
    }

    await this.usersRepository.update(userId, { favoriteProducts: favorites });
    return this.findById(userId);
  }

  async toggleCartItem(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<User> {
    const user = await this.findById(userId);
    let cart = user.cartProducts || [];

    const index = cart.findIndex((item) => item.id === productId);

    if (index > -1) {
      cart.splice(index, 1);
    } else {
      cart.push({ id: productId, quantity });
    }

    await this.usersRepository.update(userId, { cartProducts: cart });
    return this.findById(userId);
  }
}
