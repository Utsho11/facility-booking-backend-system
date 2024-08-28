import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  //   console.log({userData});

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userEmail } = req.user;

  const result = await UserServices.getMeFromDb(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getMe,
};
