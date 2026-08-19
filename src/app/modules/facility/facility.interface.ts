export type TFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image?: string;
  category?: string;
  amenities?: string[];
  rating?: number;
  reviewsCount?: number;
  isDeleted?: boolean;
};
