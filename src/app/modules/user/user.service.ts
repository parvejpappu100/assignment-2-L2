import { TUser } from './user.interface';
import  User  from './user.model';

// to create user into db:
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exists");
  }
  const result = await User.create(userData);

  return result;
};

// to get all users from db:
const getAllUsersDataFromDB = async () => {
  const result = await User.find();
  return result;
};

// to get single user data from db:
const getSingleUserDataFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};
// to delete single user data from db:
const deleteSingleUserDataFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId } , {isDeleted: true});
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersDataFromDB,
  getSingleUserDataFromDB,
  deleteSingleUserDataFromDB,
};
