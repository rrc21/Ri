import User from "../models/model";
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

class Controller {
  async tologin(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const userlogin: any = await User.findOneAndUpdate(
        { email: email, password: password },
        { $set: { login_status: true } },
        { new: true }
      );

      if (!userlogin || userlogin === null) {
        res
          .status(200)
          .json({ code: 401, message: "Invalid username or password" });
      }
      const userd = {
        user_id: userlogin._id,
        user_role: userlogin.role,
        login_user: userlogin.name,
        login_status: true,
        email: userlogin.email,
        password: userlogin.password,
      };
      const ACCESS_TOKEN_SECRET: any =
        process.env.ACCESS_TOKEN_SECRET || "210674";
      const REFRESH_TOKEN_SECRET: any =
        process.env.REFRESH_TOKEN_SECRET || "210674";
      const accesstoken = jwt.sign(userd, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      const refreshtoken = jwt.sign(userd, REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      const data = {
        accesstoken,
        refreshtoken,
      };

      const userDetails = {
        role: userlogin.role,
        name: userlogin.name,
        data: userlogin,
        login_status: true,
      };

      res.status(200).json({
        data,
        code: 200,
        message: "success",
        userDetails: userDetails,
      });
    } catch (error: any) {
      return res.status(400).send("something went wrong");
    }
  }
  async tologout(req: any, res: any) {
    try {
      const { id } = req.params;
      const logoutData: any = await User.collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { login_status: false } }
      );
      if (logoutData?.ok) return res.status(200).send("Logout successfull");
      return res.status(400).send({ message: "Something went wrong" });
    } catch (err: any) {
      console.log("error", err);
      return res.status(400).send({ message: "Failed to logout", error: err });
    }
  }
}

const loginLogoutController = new Controller();
export default loginLogoutController;
