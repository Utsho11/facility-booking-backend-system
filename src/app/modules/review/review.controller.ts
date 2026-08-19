import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const result = await ReviewServices.createReviewIntoDB(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review submitted successfully',
    data: result,
  });
});

const getFacilityReviews = catchAsync(async (req, res) => {
  const { facilityId } = req.params;
  const result = await ReviewServices.getReviewsForFacilityFromDB(facilityId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility reviews retrieved successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getFacilityReviews,
};
