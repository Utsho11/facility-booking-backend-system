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

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilitiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.getSingleFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',

    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No facility is found with that ID!!',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated succesfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.deleteFacilityFromDB(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No facility is found with that ID!!',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  getAllFacilities,
  getSingleFacility,
  deleteFacility,
};
