import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateToyDto } from 'src/modules/toys/dto/create-toy.dto';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateToyDto)
  favoriteToys: CreateToyDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateToyDto)
  hatedToys: CreateToyDto[];
}
