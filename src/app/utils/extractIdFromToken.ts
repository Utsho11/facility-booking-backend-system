import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/user/user.model';
import mongoose from 'mongoose';

export const extractIdFromToken = async (tokenData: string) => {
  let token;

  if (tokenData && tokenData.startsWith('Bearer ')) {
    token = tokenData.split(' ')[1];
  } else {
    token = tokenData;
  }

  // checking if the token is missing
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: userEmail });

  return user?._id as mongoose.Types.ObjectId;
};
