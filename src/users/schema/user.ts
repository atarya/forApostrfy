import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document; 

@Schema()
export class User {
    
    @Prop({
        required: true,
        trim: true,
    })    
    name: string;
    
    @Prop({ 
        unique: true, // This is the field that will be used for authentication
        required: true,
        lowercase: true,
        trim: true,
        type: String,
    })
    email: string;
    
    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);