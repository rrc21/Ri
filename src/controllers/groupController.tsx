import User from "../models/model";
import Groups from "../models/message-model";
const { ObjectId } = require("mongodb");

class Controller {
  async createGroup(req: any, res: any) {
    try {
      const { group_name, members } = req.body;
      if (group_name !== "" && members.length) {
        const createStatus: any = await Groups.collection.insertOne({
          name: group_name,
          members: members,
          messages: [],
        });
        const ids: any = members.map((id: any) => new ObjectId(id));
        if (createStatus.acknowledged) {
          const updateUser: any = await User.collection.updateMany(
            { _id: { $in: ids } },
            { $push: { groups: createStatus.insertedId } }
          );
          return res
            .status(200)
            .send({ message: "group is created", data: req.body });
        }
      }
      return res.status(201).send("group cannot be created");
    } catch (err: any) {
      console.log("error in creategroup", err);
      return res.status(400).send("Something went wrong");
    }
  }

  async deleteGroup(req: any, res: any) {
    try {
      const { id } = req.params;
      const deleteStatus: any = await Groups.collection.deleteOne({
        _id: new ObjectId(id),
      });
      if (deleteStatus.acknowledged && deleteStatus.deletedCount > 0) {
        await User.collection.updateMany(
          {},
          { $pull: { groups: new ObjectId(id) } }
        );
        return res.status(200).send({ message: "group is deleted" });
      }
      return res.status(201).send("group cannot be deleted");
    } catch (err: any) {
      return res.status(400).send("Something went wrong");
    }
  }

  async addMemberToGroup(req: any, res: any) {
    try {
      const { group, member } = req.body;
      if (group !== "" && member !== "") {
        const addtogroup: any = await Groups.collection.findOneAndUpdate(
          { _id: ObjectId(group) },
          { $push: { groups: member } }
        );
        if (addtogroup) {
          await User.collection.findOneAndUpdate(
            { _id: new ObjectId(member) },
            { $push: { groups: group } }
          );
          return res.status(200).send("Added to group");
        }
      }
      return res
        .status(201)
        .send({ message: "Cannot be added into the group" });
    } catch (err: any) {
      return res.status(400).send("Something went wrong");
    }
  }
}

const groupController = new Controller();
export default groupController;
