import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  onModuleInit() {
    this.connection.once('open', () => {
      console.log('Connected to MongoDB!');
    });

    this.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
