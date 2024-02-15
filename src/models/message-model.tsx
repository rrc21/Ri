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
    members:{
        type:Array,
    },
    messages:{
        type:Array,
    }

});

const Groups = mongoose.model('groups',  userSchema);
export default Groups;

