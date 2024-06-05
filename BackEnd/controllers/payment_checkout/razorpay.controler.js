import Razorpay from 'razorpay';
import {validatePaymentVerification} from 'razorpay/dist/utils/razorpay-utils.js';
import {envData} from '../../envdata.js'

const instence = new Razorpay({
    key_id: envData.razorepay.userkey,
    key_secret: envData.razorepay['secret code']
})

const paymentCreate = async (req, res) => {
    const getOrder  = await instence.orders.create({amount: req.body.amount, currency: "INR"});
    req.session.OrderId = getOrder.id;
    res.status(200).json(getOrder);
}

const checkOutData = async (req, res) => {
    const {payment, order_id, signature } = req.body
    const isvailed = await validatePaymentVerification( {payment_id: payment, order_id: order_id},signature, '' )
    if(!isvailed){
        return res.status(400).json({'data': 'Not Vaild'});
    }
    console.log(isvailed);
    res.status(200).json({"Data": "Success"});
}

export {paymentCreate, checkOutData}