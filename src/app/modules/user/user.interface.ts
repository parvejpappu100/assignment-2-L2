//* 1. Create an interface representing a document in MongoDB.
import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrders = [
  {
    productName: string;
    price: number;
    quantity: number;
  },
];

export type TUser = {
  id: { type: number; required: true; unique: true };
  username: { type: string; required: true; unique: true };
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: { type: [string] };
  address: TUserAddress;
  orders: TUserOrders;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
