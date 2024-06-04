import { Router } from "express";
import {paymentCreate, checkOutData } from "../controllers/payment_checkout/razorpay.controler.js";

const payment = Router();

payment.route('/').post(paymentCreate);
payment.route('/checkOut').post(checkOutData);
// payment.route('/').get(getPayment);


export default payment;