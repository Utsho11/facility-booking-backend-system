import { Schema, model } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String },
    category: {
      type: String,
      enum: [
        'tennis',
        'badminton',
        'football',
        'basketball',
        'swimming',
        'cricket',
        'squash',
        'volleyball',
        'general',
      ],
      default: 'general',
    },
    amenities: { type: [String], default: [] },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 12 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        return {
          _id: ret._id,
          name: ret.name,
          description: ret.description,
          pricePerHour: ret.pricePerHour,
          location: ret.location,
          isDeleted: ret.isDeleted,
          image: ret.image,
          category: ret.category,
          amenities: ret.amenities,
          rating: ret.rating,
          reviewsCount: ret.reviewsCount,
        };
      },
    },
  },
);

export const Facility = model<TFacility>('Facility', facilitySchema);
