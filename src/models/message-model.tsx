import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
});

const Groups = mongoose.model("groups", userSchema);
export default Groups;
