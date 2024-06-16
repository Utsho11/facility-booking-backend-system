import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', FacilityControllers.getAllFacilities);

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

router.delete('/:id', auth('admin'), FacilityControllers.deleteFacility);

export const FacilityRoutes = router;
