import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Toy } from './entities/toy.entity';
import { Model } from 'mongoose';
import { CreateToyDto } from './dto/create-toy.dto';

@Injectable()
export class ToysService {
  constructor(@InjectModel(Toy.name) private readonly toyModel: Model<Toy>) {}
  getAllToys() {
    return this.toyModel.find().exec();
  }

  async createToy(createToyDto: CreateToyDto) {
    const newToy = new this.toyModel(createToyDto);
    return await newToy.save();
  }

  async getOrCreateToys(toys: {
    favoriteToys: CreateToyDto[];
    hatedToys: CreateToyDto[];
  }) {
    const favoriteObjectIds = await Promise.all(
      toys.favoriteToys.map(async (toy) => {
        const theToy = await this.checkExistance(toy);
        return theToy._id;
      }),
    );

    const hatedObjectIds = await Promise.all(
      toys.hatedToys.map(async (toy) => {
        const theToy = await this.checkExistance(toy);
        return theToy._id;
      }),
    );
    return { favoriteObjectIds, hatedObjectIds };
  }

  async checkExistance(toy: CreateToyDto) {
    const existingToy = await this.toyModel.findOne({ name: toy.name });

    if (!existingToy) {
      return this.createToy(toy);
    }
    return existingToy;
  }
}
