import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/users/schema/user";

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {  }

    async validateUser(email: string, password: string): Promise<any> { // This is called when a client tries to login
            let user = await this.userModel.findOne(
              { email: email }
            ).exec();
            if (user == null)
                return null;
            if (user.password == password)
                return user;
            return null;
          }
}