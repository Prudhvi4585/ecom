import express from 'express';
import {registerController,loginController, testController} from '../controllers/authController.js';
import {requireSignIn ,isAdmin} from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();
// routing 
// register || method post 

router.post('/register', registerController );

router.post('/login', loginController);

router.get('/test', requireSignIn,isAdmin, testController);

export default router;
