import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';
import { join } from 'path';
import { readFileSync } from 'fs';

const controllerService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message;
  if (verifyResponse && verifyResponse?.pay_status === 'Successful') {
    await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
        isBooked: 'confirmed',
      },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const PaymentService = {
  controllerService,
};
