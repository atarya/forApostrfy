import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/schema/user';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportLocalStrategy } from './passport.local.strategy';

@Module({
    imports: [UsersModule, MongooseModule.forFeature([ // Mongo DB module for the User model (see src/users/schema/user.ts)
        { name: User.name, schema: UserSchema },
      ]), PassportModule], // Passport module for authentication (see src/auth/passport.local.strategy.ts)
    controllers: [],
    providers: [AuthService, UsersModule, PassportLocalStrategy], // User module and PassportLocalStrategy are imported here so that they can be used in the AuthService
    exports: [AuthService], // This is exported so that it can be used in the User CRUD actions (see src/users/users.controller.ts)
})
export class AuthModule {}
