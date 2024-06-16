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

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated succesfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
};
