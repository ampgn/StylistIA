import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Mot de passe haché

  @Prop({ type: [String], default: [] })
  preferences: string[];

  @Prop({ type: [Object], default: [] })
  outfitHistory: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
