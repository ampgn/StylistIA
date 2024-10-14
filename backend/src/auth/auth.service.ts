import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../services/users.service';
import { CreateUserDto, LoginUserDto } from 'src/auth/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await this.usersService.findOneByEmail(email);
      if (existingUser) {
        throw new UnauthorizedException('Email est déjà utilisé.');
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      return this.usersService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      console.error(error); // Log l'erreur pour le débogage
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la création de votre compte, veuillez réessayer ultérieuement.',
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      // Récupérer l'utilisateur par email
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'Les identifiants renseignés sont invalides.',
        );
      }

      // Générer un JWT
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error(error); // Log l'erreur pour le débogage
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la connexion.',
      );
    }
  }
}
