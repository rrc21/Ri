import {Router} from "express";
const router:Router = Router()
import usersController from '../controllers/controller';
import authenticateToken from '../middleware';

router.route('/login').post(usersController.tologin);
router.route('/logout/:id').put(usersController.tologout);
router.route('/get-users').get(authenticateToken,usersController.getUsers);
router.route('/add-user').post(authenticateToken,usersController.postUser);
router.route('/create-group').post(usersController.createGroup);
router.route('/delete-group/:id').delete(usersController.deleteGroup);
router.route('/send-message-in-group/:id').put(usersController.messageInGroup)
router.route('/get-messages/:id').get(usersController.getMessagesInGroup)


export { router as userRoutes}