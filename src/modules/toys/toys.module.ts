import { Module } from '@nestjs/common';
import { ToysController } from './toys.controller';
import { ToysService } from './toys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Toy, ToySchema } from './entities/toy.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Toy.name, schema: ToySchema }])],
  controllers: [ToysController],
  providers: [ToysService],
  exports: [ToysService],
})
export class ToysModule {}
