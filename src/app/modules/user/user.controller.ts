import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

//   console.log({userData});
  

  const result = await UserServices.createUserIntoDB(userData);
  
  const sanitizedResult = result.map(user => {
    const { _id, password, ...rest } = user.toObject();
    return { _id, ...rest };
  });
  

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: sanitizedResult,
  });
});

export const UserControllers = {
  createUser,
};
