import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { Messages } from 'src/main/constants/messages.constants';
import { JwtConstants } from 'src/main/constants/api.constants';
import { ProductSchema } from 'src/product/shemas/product.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JwtConstants.EXPIRES_IN_ACCESS },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {
  constructor() {
    console.log(Messages.USERMODULE_INITIALIZED);
  }
}
