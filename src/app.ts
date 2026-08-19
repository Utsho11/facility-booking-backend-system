/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { BookingControllers } from './app/modules/booking/booking.controller';
import checkAvailability from './app/utils/checkAvailability';

import config from './app/config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      config.client_base_url as string,
    ].filter(Boolean),
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Welcome to our facility-booking backend Server!!');
});

app.get('/api/check-availability', checkAvailability);

app.use('/api', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
