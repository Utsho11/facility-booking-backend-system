import { Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { string } from "zod";

const bookingSchema = new Schema<TBooking>({
    facility:{type: String},
    date: {type:String},
    startTime: {type:String},
    endTime: {type:String},
})