import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './modules/cats/cats.module';
import { ToysModule } from './modules/toys/toys.module';

@Module({
  // Here we import the MongooseModule and call the forRoot method, which takes 2 arguments
  // One is the string where the database is located
  // Second one is the config object, which is optional
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-test'),
    CatsModule,
    ToysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
