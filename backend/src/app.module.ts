import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserController } from './controllers/users.controller';

import { AppService } from './app.service';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './schemas/users.schema';
import { environment } from 'env';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot(environment.DATABASE_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UsersService, AuthService, JwtService],
})
export class AppModule {}
