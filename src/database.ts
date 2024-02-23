import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connects() {
  const url = "mongodb://localhost:27017/mydb";
  return connect(url)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err: any) => {
      console.log("DB Connection Error ", err);
    });
}
export default connects;
