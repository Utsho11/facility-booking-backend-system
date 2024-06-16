import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newFacility = await Facility.create([payload], { session });

    if (!newFacility.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFacility;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
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
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedAdmin

    await session.commitTransaction();
    await session.endSession();

    return deletedFacility;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB
};
