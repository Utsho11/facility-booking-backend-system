import express from 'express';
import { ReviewControllers } from './review.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ReviewControllers.createReview,
);

router.get('/:facilityId', ReviewControllers.getFacilityReviews);

export const ReviewRoutes = router;
