import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const userData = req.body;

//   console.log({userData});
  

  const result = await FacilityServices.createFacilityIntoDB(userData);
  
  
  

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
};
