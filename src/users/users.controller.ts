import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // This is the route that will be used to create a new user
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto); // Action does not need authentication
  }

  @Get() // This is the route that will be used to get all the users
  @UseGuards(AuthGuard('local'))  // This is the guard that will be used to protect the route
  findAll() {
    return this.usersService.findAll(); // Action needs authentication
  }
  
  @Get(':email') // This is the route that will be used to get a specific user by email
  @UseGuards(AuthGuard('local')) // This is the guard that will be used to protect the route
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email); // Action needs authentication
  }
  
  @Patch(':email') // This is the route that will be used to update a specific user by email
  @UseGuards(AuthGuard('local')) // This is the guard that will be used to protect the route
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);  // Action needs authentication
  }
  
  @Delete(':email') // This is the route that will be used to delete a specific user by email
  @UseGuards(AuthGuard('local')) // This is the guard that will be used to protect the route
  remove(@Param('email') email: string) {
    return this.usersService.remove(email); // Action needs authentication
  }
}
