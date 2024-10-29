import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
config();
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
