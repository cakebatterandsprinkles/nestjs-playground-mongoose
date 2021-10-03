import { IsString } from 'class-validator';

export class CreateToyDto {
  @IsString()
  name: string;
}
