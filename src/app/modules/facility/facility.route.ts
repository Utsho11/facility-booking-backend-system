import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);

export const FacilityRoutes = router;
