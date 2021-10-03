import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // The mongo collection name will be 'cat, mongo makes all collections lowercase and plural by default'
export class Toy extends Document {
  @Prop()
  name: string;
}

export const ToySchema = SchemaFactory.createForClass(Toy);
