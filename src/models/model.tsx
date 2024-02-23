import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  login_status: {
    type: Boolean,
    required: true,
  },
  groups: {
    type: Array,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);
export default User;
