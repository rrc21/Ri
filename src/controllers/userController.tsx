import User from "../models/model";
const jwt = require("jsonwebtoken");

class Controller {
  async getUsers(req: any, res: any) {
    try {
      const usersData: any = await User.find({});
      res.status(200).send(usersData);
    } catch (err) {
      res.status(400).send("please try again");
    }
  }

  async postUser(req: any, res: any) {
    try {
      const token = req.header("auth-token");
      if (verifyAccess(token)) {
        // only admin can have access to add new user
        const payload = { ...req.body, loginstatus: false, groups: [] };
        if (Object.values(payload).every((el: any) => el !== "")) {
          // validation , every field should be non-empty
          const usersData: any = await User.collection.insertOne(payload);
          return res
            .status(200)
            .send({ message: "post user is success", data: usersData });
        }
        return res.status(201).send({ message: "some fields are missing" });
      }
      return res.status(400).send({
        message: "You dont have access to add new member or you have logout",
      });
    } catch (err) {
      return res.status(400).send("please try again");
    }
  }
}

function verifyAccess(token: any) {
  token = token.split(" ")[1];
  const decodedData: any = jwt.decode(token, { complete: true });
  const decoded = decodedData.payload;
  if (decoded.user_role === "Admin" && decoded.login_status === true) {
    return true;
  }
  return false;
}

const userController = new Controller();
export default userController;
