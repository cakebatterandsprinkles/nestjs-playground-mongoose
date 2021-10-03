import {
  HttpStatus,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CatDomain } from './domain/cat';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  findAllCats(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.catModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate(['favoriteToys', 'hatedToys'])
      .exec();
  }

  async findOneCat(id: string) {
    const theCat = await this.catModel
      .findOne({ _id: id })
      .populate('favoriteToys')
      .exec();
    if (!theCat) {
      throw new HttpException(
        `This cat with the id of ${id} does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return theCat;
  }

  async findBreed(breed: string) {
    const cats = await this.catModel.find({ breed: breed }).exec();
    return cats;
  }

  async createCat(newCat: CatDomain) {
    const cat = new this.catModel(newCat);
    return await cat.save();
  }

  async updateCat(id: string, updateCatDto: UpdateCatDto) {
    const existingCat = await this.catModel
      .findOneAndUpdate({ _id: id }, { $set: updateCatDto }, { new: true })
      .exec();

    if (!existingCat) {
      throw new NotFoundException(
        `The cat with the id of ${id} could not be found.`,
      );
    }

    return existingCat;
  }

  async removeCat(id: string) {
    const cat = await this.findOneCat(id);
    return cat.remove();
  }
}
