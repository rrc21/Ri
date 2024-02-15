

import mongoose,{connect} from "mongoose"
import  dotenv from 'dotenv';
  dotenv.config();

function connects(){
    const url = "mongodb://localhost:27017/mydb";
    mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4
    return connect(url)
    .then(()=>{
        console.log("DB Connected");
    }).catch((err:any)=>{
        console.log("DB Connection Error ", err);
    })
}
export default connects;