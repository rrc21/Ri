require("dotenv").config();
import { NextFunction } from "express";

const jwt = require("jsonwebtoken");

class Middleware {
  methodNotAllowed(req: any, res: any) {
    return res.error(res.buildError(405, "METHOD-NOT-ALLOWED"), "", req, res);
  }
}
const middleware = new Middleware();
export { middleware };

async function authenticateToken(req: any, res: any, next: NextFunction) {
  let token = req.header("auth-token");
  if (token === null || token === undefined) {
    return res.status(400).json({ message: "AccessToken is Required" });
  }

  token = token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "210674", (err: any) => {
    if (!err) {
      const decodedData: any = jwt.decode(token, { complete: true });
      const decoded = decodedData.payload;
      req.user_id = decoded.user_id;
      req.loginuser = decoded.login_user;
      req.role = decoded.user_role;
      req.login_status = decoded.login_status;
      req.email = decoded.email;
      next();
    } else {
      res.status(401).json({ message: "user not authenticated" });
    }
  });
}
export default authenticateToken;
