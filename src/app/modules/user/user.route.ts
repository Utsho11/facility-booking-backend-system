import express from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/me', auth('admin', 'user'), UserControllers.getMe);

export const UserRoutes = router;
