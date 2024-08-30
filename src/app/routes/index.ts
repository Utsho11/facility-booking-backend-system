import { Router } from 'express';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { UserRoutes } from '../modules/user/user.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
