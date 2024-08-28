import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const newStudent = await User.create(payload);

  if (!newStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }

  return newStudent;
};

const getMeFromDb = async (email: string) => {
  const result = await User.findOne({ email: email });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getMeFromDb,
};
