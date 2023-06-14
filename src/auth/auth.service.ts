import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.signUp(authCredintialsDto);
  }

  async signIn(authCredintialsDto: AuthCredintialsDto) {
    const username = await this.userRepository.validateUserPassword(
      authCredintialsDto,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');
  }
}
