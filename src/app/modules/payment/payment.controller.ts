import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const confirmationController = async (req: Request, res: Response) => {
  const transactionId = (req.query.transactionId || req.body?.tran_id) as string;
  const redirectUrl = await PaymentService.confirmationService(transactionId);
  return res.redirect(redirectUrl);
};

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const result = await PaymentService.getPaymentDetailsFromDB(transactionId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment details retrieved successfully',
    data: result,
  });
});

export const paymentController = {
  confirmationController,
  getPaymentDetails,
};
