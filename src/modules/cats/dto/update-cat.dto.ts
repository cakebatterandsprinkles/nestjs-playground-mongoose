// update-cat.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';
import { Toy } from '../../toys/entities/toy.entity';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  @IsArray()
  @Type(() => Toy)
  favoriteToys: Toy[];

  @IsOptional()
  @IsArray()
  @Type(() => Toy)
  hatedToys: Toy[];
}
