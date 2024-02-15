require('dotenv').config()
import { NextFunction } from "express";

const jwt = require("jsonwebtoken");
//const user = require("./models/users");
// import { response } from '../utils/response';
import fs = require('fs');

class Middleware {
    /**
        * Route not allowed
        * @param  {} req
        * @param  {} res
        */
     methodNotAllowed(req: any, res: any) {
       return res.error(res.buildError(405, 'METHOD-NOT-ALLOWED'),
           '', req, res);
   }
   }
   const middleware = new Middleware();
   export {middleware}
  
async function authenticateToken(req: any, res: any,next:NextFunction) {
    console.log("inside authenticateToken",req.route.path)
    let token = req.header('auth-token');
    if(token === null || token === undefined){
        return res.status(400).json({message:"AccessToken is Required"});
    }
    
    token = token.split(' ')[1]
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "210674",(err:any)=>{
        if(!err)
   {
    const decodedData: any = jwt.decode(token, { complete: true });
    const decoded = decodedData.payload;
    console.log("decoded",decoded);
    req.user_id = decoded.user_id;
    req.loginuser = decoded.login_user;
    req.role = decoded.user_role;
    req.loginuseremail = decoded.login_user_mail
   
    next();
   }
   else{
       console.log("ERROR",err);
        res.status(401).json({message:"user not auythenticated"});
   }
});

}
   export default authenticateToken;