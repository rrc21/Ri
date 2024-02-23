import { Router } from "express";
const router: Router = Router();
// import usersController from "../controllers/controller";
import loginLogoutController from "../controllers/loginLogoutController";
import authenticateToken from "../middleware";
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';
import messageController from '../controllers/messageController';

router.route("/login")
.post(loginLogoutController.tologin);

router.route("/logout/:id")
.put(loginLogoutController.tologout);

router.route("/get-users")
.get(authenticateToken, userController.getUsers);

router.route("/add-user")
.post(authenticateToken, userController.postUser);

router.route("/create-group")
.post(groupController.createGroup);

router.route("/delete-group/:id")
.delete(groupController.deleteGroup);

router.route("/add-member-to-group")
.post(groupController.addMemberToGroup);

router.route("/send-message-in-group/:id")
.put(messageController.messageInGroup);

router.route("/get-messages/:id")
.get(messageController.getMessagesInGroup);

export { router as userRoutes };
