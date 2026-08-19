import config from '../../config';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';

const confirmationService = async (transactionId: string) => {
  let isSuccess = false;

  try {
    const verifyResponse = await verifyPayment(transactionId);

    if (verifyResponse && verifyResponse?.pay_status === 'Successful') {
      await Booking.findOneAndUpdate(
        { transactionId },
        {
          paymentStatus: 'paid',
          isBooked: 'confirmed',
        },
      );
      isSuccess = true;
    }
  } catch (error) {
    isSuccess = false;
  }

  const clientUrl = config.client_base_url;
  const redirectUrl = isSuccess
    ? `${clientUrl}/payment-status?transactionId=${transactionId}&status=success`
    : `${clientUrl}/payment-status?transactionId=${transactionId}&status=failed`;

  return redirectUrl;
};

const getPaymentDetailsFromDB = async (transactionId: string) => {
  const booking = await Booking.findOne({ transactionId })
    .populate('facility')
    .populate('user');
  return booking;
};

export const PaymentService = {
  confirmationService,
  getPaymentDetailsFromDB,
};
