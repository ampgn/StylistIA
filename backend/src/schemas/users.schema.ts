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

  @Prop()
  preferences: string[];

  @Prop({
    type: [
      {
        date: { type: Date, required: true },
        items: { type: [String], required: true },
      },
    ],
  })
  outfitHistory: {
    date: Date;
    items: string[];
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
