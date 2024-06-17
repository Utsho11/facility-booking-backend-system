import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import mongoose from 'mongoose';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newStudent = await User.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createUserIntoDB,
};
