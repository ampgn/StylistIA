import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dti';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save(); // Sauvegarder le nouvel utilisateur dans MongoDB
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Trouver tous les utilisateurs dans MongoDB
  }
}
