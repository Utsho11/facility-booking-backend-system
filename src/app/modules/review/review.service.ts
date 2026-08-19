import mongoose from 'mongoose';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { extractIdFromToken } from '../../utils/extractIdFromToken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Facility } from '../facility/facility.model';

const createReviewIntoDB = async (payload: Partial<TReview>, token: string) => {
  const uid = await extractIdFromToken(token);

  const facilityExists = await Facility.findById(payload.facility);
  if (!facilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found!');
  }

  const newReview = await Review.create({
    ...payload,
    user: uid,
  });

  return newReview.populate('user', 'name email');
};

const getReviewsForFacilityFromDB = async (facilityId: string) => {
  const reviews = await Review.find({
    facility: new mongoose.Types.ObjectId(facilityId),
  })
    .populate('user', 'name email')
    .sort('-createdAt');

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? Number(
          (
            reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
          ).toFixed(1),
        )
      : 5.0;

  return {
    reviews,
    avgRating,
    totalReviews,
  };
};

export const ReviewServices = {
  createReviewIntoDB,
  getReviewsForFacilityFromDB,
};
