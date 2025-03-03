import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const {user : userData} = req.body;

    // * will call service function to send this data:
    const result = await StudentServices.createUserIntoDB(userData);

    // * send response:
    res.status(200).json({
      success: true,
      message: 'User is created successfully.',
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

export const UserControllers = {
  createUser,
};
