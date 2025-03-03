import { TUser } from './user.interface';
import { User } from './user.model';

// to create user into db:
const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// to get all users from db:
const getAllUsersDataFromDB = async () => {
  const result = await User.find();
  return result;
};

// to get single user data from db:
const getSingleUserDataFromDB = async (id: string) => {
  const result = await User.findOne({ id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersDataFromDB,
  getSingleUserDataFromDB
};
