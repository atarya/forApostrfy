import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {  } // Injects the User model (see src/users/schema/user.ts)
  
  // All data access logic is handled here asynchronously

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save(); // Saves the user to the database
  }

  async findAll() {
    return await this.userModel.find({}, { password: 0 }).exec(); // Returns all users without the password field
  }

  async findOne(email: string) {
    return await this.userModel.findOne(
      { email: email }, { password: 0 }
    ).exec(); // Returns the user with the specified email without the password field
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    let user = await this.userModel.findOne({
      email: email
    }).exec();
    if (user == null)
      return null;
    user.set(updateUserDto);
    return await user.save(); // Updates the user with the specified email
  }

  async remove(email: string) {
    return await this.userModel.deleteOne({
      email: email
    }).exec(); // Deletes the user with the specified email
  }
}
