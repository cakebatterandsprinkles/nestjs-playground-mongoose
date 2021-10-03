import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './entities/cat.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ToysModule } from '../toys/toys.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    ToysModule,
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [],
})
export class CatsModule {}
