import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodValidationSchema from './user.validation';
import { z } from 'zod';

// to create user in db:
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // * user data validation using zod:
    const zodParsedData = userZodValidationSchema.parse(userData);

    // * will call service function to send this data:
    const result = await UserServices.createUserIntoDB(zodParsedData);

    // * send response:
    res.status(200).json({
      success: true,
      message: 'User created successfully.',
      data: result,
    });
  } catch (error: any) {
    // send response;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

// to get all users from db:
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersDataFromDB();

    // send response;
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// to get single user data from db:
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserDataFromDB(parseInt(userId));

    if(!result){
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found"
        }
      })
    }
    // send response;
    res.status(200).json({
      success: true,
      message: 'Get single user successfully',
      data: result,
    });
  } catch (error: any) {
    // send response;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};


// to get single user orders data from db:
const getSingleUserOrdersData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserOrdersDataFromDB(parseInt(userId));

    if(!result){
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found"
        }
      })
    }
    // send response;
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {orders: result?.orders},
    });
  } catch (error: any) {
    // send response;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

// to get single user data from db:
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.deleteSingleUserDataFromDB(
      parseInt(userId),
    );

    // send response;
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result.upsertedId,
    });
  } catch (error: any) {
    // send response;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const updateData = req.body;

    // * Validate the complete user object using Zod
    const zodParsedData = userZodValidationSchema.parse(updateData);

    const result = await UserServices.updateSingleUserDataIntoDB(
      userId,
      zodParsedData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const addOderDataToUser = async (req: Request, res: Response) => {
  try {

    const userId = parseInt(req.params.userId);
    const orderData = req.body;

    const orderValidationSchema = z.object({
      productName: z.string().min(1, 'Product name is required').trim(),
      price: z.number().min(0, 'Price must be a positive number'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
    });

    const validatedOderData = orderValidationSchema.parse(orderData);

    const result = await UserServices.addProductToUserOrder(userId, validatedOderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result && null,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};


export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  addOderDataToUser,
  getSingleUserOrdersData,
};
