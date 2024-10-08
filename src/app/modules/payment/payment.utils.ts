import axios from 'axios';
import config from '../../config';
import { TCustomerDetails } from './payment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const initiatePayment = async (paymentData: TCustomerDetails) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.tranId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.tranId}`,
      fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      cancel_url: 'http://localhost:5173',
      amount: paymentData.amount,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.cus_name,
      cus_email: paymentData.cus_email,
      cus_add1: paymentData.cus_address,
      cus_add2: paymentData.cus_address,
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.cus_phone,
      type: 'json',
    });
    return response.data;
  } catch (error) {
    throw new AppError(
      httpStatus.FAILED_DEPENDENCY,
      'Payment initiation Failed!',
    );
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.verify_payment_url!, {
      params: {
        request_id: tnxId,
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
      },
    });

    return response.data;
  } catch (error) {
    throw new AppError(
      httpStatus.FAILED_DEPENDENCY,
      'Payment verification Failed!',
    );
  }
};
