import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, // Mongo DB module for the User model (see src/users/schema/user.ts)
    ])
  ],
  controllers: [UsersController], // The controller that will be used to handle the requests (see src/users/users.controller.ts)
  providers: [UsersService], 
  exports: [UsersService], // Exported to be used in the AuthModule (see src/auth/auth.module.ts)
})
export class UsersModule {}
