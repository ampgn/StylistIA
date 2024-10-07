import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() // Champ requis
  firstName: string;

  @IsNotEmpty() // Champ requis
  lastName: string;

  @IsEmail() // Valide que c'est un email
  email: string;

  @IsArray() // Valide que c'est un tableau
  preferences: string[];

  @IsArray() // Valide que c'est un tableau
  outfitHistory: any[];
}
