import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: { email: string; password: string }) {
    const existingUser = await this.userService.findByUsername(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      email: dto.email,
      password: hashedPassword,
      favoriteProducts: [],
      cartProducts: [],
    });
    const { password, ...simpleUser } = user;
    return { user: simpleUser, ...this.generateTokens(user) };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.userService.findByUsername(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...simpleUser } = user;
    return {
      user: simpleUser,
      acessToken: this.generateTokens(user).accessToken,
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findById(decoded.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, ...simpleUser } = user;
      return { user: simpleUser, ...this.generateTokens(user) };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}
