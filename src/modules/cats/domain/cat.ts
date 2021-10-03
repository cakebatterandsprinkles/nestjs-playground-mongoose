import { ObjectId } from 'mongoose';

export class CatDomain {
  name: string;
  age: number;
  breed: string;
  favoriteToys: ObjectId[];
  hatedToys: ObjectId[];
}
