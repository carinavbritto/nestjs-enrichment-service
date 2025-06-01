import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  linkedin: string;

  @Prop({ required: true })
  github: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
