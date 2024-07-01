import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const newFacility = await Facility.create(payload);

  if (!newFacility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create facility');
  }

  return newFacility;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find();
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    return null;
  }

  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFacility = await Facility.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFacility) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No Facility found with that ID!!',
      );
    }

    // get user _id from deletedAdmin

    await session.commitTransaction();
    await session.endSession();

    return deletedFacility;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err as string);
  }
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB,
};
