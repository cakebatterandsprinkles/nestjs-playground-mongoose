import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Toy } from '../../toys/entities/toy.entity';

@Schema() // The mongo collection name will be 'cat, mongo makes all collections lowercase and plural by default'
export class Cat extends Document {
  // We don't need the id property, because mongoose adds an _id properties to schemas by default
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Toy.name, default: [] }])
  favoriteToys: Toy[];

  // You need to give the Prop decorator an expected type.
  @Prop([{ type: SchemaTypes.ObjectId, ref: Toy.name, default: [] }])
  hatedToys: Toy[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
