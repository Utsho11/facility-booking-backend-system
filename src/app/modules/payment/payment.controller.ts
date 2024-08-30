import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId } = req.query;
  const result = await PaymentService.controllerService(
    transactionId as string,
  );

  res.send(result);
};

export const paymentController = {
  confirmationController,
};
