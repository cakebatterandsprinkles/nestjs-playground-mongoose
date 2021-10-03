import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ToysService } from '../toys/toys.service';
import { ObjectId } from 'mongoose';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly toysService: ToysService,
  ) {}
  @Get()
  findAllCats(@Query() paginationQuery: PaginationQueryDto) {
    return this.catsService.findAllCats(paginationQuery);
  }

  @Get('breed/:breed')
  findBreed(@Param('breed') breed: string) {
    return this.catsService.findBreed(breed);
  }

  @Get(':id')
  findOneCat(@Param('id') id: string) {
    return this.catsService.findOneCat(id);
  }

  @Get(':breedId/:catId')
  findCat(@Param('catId') catId: string) {
    return `You are looking for the cat with the id of ${catId}.`;
  }

  @Post()
  async createCat(@Body() body: CreateCatDto) {
    const { favoriteToys, hatedToys } = body;
    const toys: { favoriteObjectIds: ObjectId[]; hatedObjectIds: ObjectId[] } =
      await this.toysService.getOrCreateToys({
        favoriteToys: [...favoriteToys],
        hatedToys: [...hatedToys],
      });

    return this.catsService.createCat({
      ...body,
      favoriteToys: toys.favoriteObjectIds,
      hatedToys: toys.hatedObjectIds,
    });
  }

  @Patch(':id')
  updateCat(@Param('id') id: string, @Body() body: any) {
    return this.catsService.updateCat(id, body);
  }

  @Delete(':id')
  removeCat(@Param('id') id: string) {
    return this.catsService.removeCat(id);
  }
}
