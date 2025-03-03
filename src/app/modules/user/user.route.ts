import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// * will call controller function:
router.post("/create-user" , UserControllers.createUser);

export const UserRoutes = router;