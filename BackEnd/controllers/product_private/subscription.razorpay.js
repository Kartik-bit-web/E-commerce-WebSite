import Razorpay from 'razorpay';
import {envData} from '../../envdata.js'

const Instance = new Razorpay({
    key_id: envData.razorepay.userkey,
    key_secret: envData.razorepay['secret code']
});

const CreateSubcription = (req, res) => {
    // const some = Instance.plans.fetch('plan_OLPEW3S6d6FbaP')
    let {planeId} = req.body;
    console.log(planeId)
    const SubCreate = Instance.subscriptions.create({
        plan_id: planeId,
        customer_notify: 1,
        total_count: 1
    })

    SubCreate.then((result) => {
        res.status(200).json({result})
    }).catch((err) => {
        res.status(404).json({err})
    })
}






export {CreateSubcription}