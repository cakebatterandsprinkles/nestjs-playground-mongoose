import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // With the @Type() decorator, we're making sure the value that's coming in is parsed to a number
  // Query params come through the network as string, this is important to not get type errors
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset: number;
}
