import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/confirmation', paymentController.confirmationController);
router.get('/confirmation', paymentController.confirmationController);
router.get('/verify/:transactionId', paymentController.getPaymentDetails);

export const PaymentRoutes = router;
