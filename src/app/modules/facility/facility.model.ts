import { Schema, model } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        return {
          _id: ret._id,
          name: ret.name,
          description: ret.description,
          pricePerHour: ret.pricePerHour,
          location: ret.location,
          isDeleted: ret.isDeleted,
        };
      },
    },
  },
);

export const Facility = model<TFacility>('Facility', facilitySchema);
