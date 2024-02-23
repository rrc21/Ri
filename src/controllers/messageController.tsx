import User from "../models/model";
import Groups from "../models/message-model";
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

class Controller {
 
  async messageInGroup(req: any, res: any) {
    try {
      const { id } = req.params;
      const { from, message } = req.body;
      const message_payload: any = { from: from, message: message };
      const pushMsg: any = await Groups.collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $push: { messages: message_payload } }
      );
      if (pushMsg) {
        return res.status(200).send({ message: "Message sent", data: pushMsg });
      }
      return res.status(201).send("Message not sent");
    } catch (err: any) {
      return res.status(400).send("Something went wrong");
    }
  }

  async getMessagesInGroup(req: any, res: any) {
    try {
      const { id } = req.params;
      const messages: any = await Groups.collection.findOne({
        _id: new ObjectId(id),
      });
      return res
        .status(200)
        .send({ message: "Got group Messages", messages: messages });
    } catch (err: any) {
      return res.status(400).send({ message: "Something Went Wrong" });
    }
  }
}

const messageController = new Controller();
export default messageController;
