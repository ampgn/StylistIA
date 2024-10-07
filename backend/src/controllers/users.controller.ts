import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dti';
/* import { Observable, of } from 'rxjs'; */
import { User } from 'src/schemas/users.schema';
import { UsersService } from 'src/services/users.service';

@Controller('users') // Définit la route pour ce contrôleur
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto); // On passe tout le DTO directement
  }

  // Récupérer tous les utilisateurs
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll(); // Ajoute un endpoint GET pour tester
  }

  /* @Get()
  getUsers(): Observable<User[]> {
    return of(this.usersService.findAll()); // Ajoute un endpoint GET pour tester
  } */
}
