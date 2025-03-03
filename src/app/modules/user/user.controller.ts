import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodValidationSchema from './user.validation';

// to create user in db:
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // * user data validation using zod:
    const zodParsedData = userZodValidationSchema.parse(userData)

    // * will call service function to send this data:
    const result = await UserServices.createUserIntoDB(zodParsedData);

    // * send response:
    res.status(200).json({
      success: true,
      message: 'User is created successfully.',
      data: result,
    });
  } catch (error) {
    // send response;
    res.status(500).json({
      success: false,
      message:  'Something went wrong!',
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
      message: 'Users are retrieve successfully.',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// to get single user data from db:
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userID;

    const result = await UserServices.getSingleUserDataFromDB(userId);

    // send response;
    res.status(200).json({
      success: true,
      message: 'Get single user successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
