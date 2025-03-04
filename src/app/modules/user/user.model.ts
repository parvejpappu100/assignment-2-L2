import { Schema, model } from 'mongoose';
import {
  TUserName,
  TUserAddress,
  TUserOrders,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const userOrdersSchema = new Schema<TUserOrders>([
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      trim: true,
    },
  },
]);

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required.'],
    unique: true,
    trim: true,
  },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  fullName: { type: userNameSchema, required: [true, 'User name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: true },
  hobbies: {
    type: [String],
    required: [true, 'At least one hobby is required'],
  },
  address: userAddressSchema,
  // orders: userOrdersSchema,
  orders: { type: [userOrdersSchema], required: false },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  // hashing password and save into db
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook:
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as { password?: string };

  if (update.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// * Creating a custom static method:
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// * Create a Model:
const User = model<TUser, UserModel>('User', userSchema);

export default User;
