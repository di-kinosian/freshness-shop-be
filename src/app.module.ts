import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
