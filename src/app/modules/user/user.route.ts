import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// * will call controller function:
router.post('/create-user', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.put('/:userId', UserControllers.updateSingleUser);
router.put('/:userId/create-order', UserControllers.addOderDataToUser);
router.get('/:userId/orders', UserControllers.getSingleUserOrdersData);
router.get('/:userId/orders/total-price', UserControllers.getSingleUserOrdersPriceData);


export const UserRoutes = router;
