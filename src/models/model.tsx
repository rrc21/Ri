import { ObjectId } from 'mongodb';
import mongoose from'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id:{
        type:Number,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    role:{
        type:String,
        enum: ['User','Admin']
    },
    number:{
        type:Number,
    },
    login_status:{
        type:Boolean,
    },
    groups:{
        type:Array,
    },

});

const User = mongoose.model('users',  userSchema);
export default  User;

