import { Router } from "express";
import { getVideoDetail, privateControl } from "../controllers/product_private/privateVideo.controller.js";
import { AuthCheck } from "../middleware/AuthCheck.Middle.js";
import { CheckUserPaid } from "../middleware/PaidVersionCheck.js";
import { CreateSubcription } from "../controllers/product_private/subscription.razorpay.js";

const privateVideo = Router();

privateVideo.route('/myvideo/:videoName').all(AuthCheck, CheckUserPaid, privateControl);
privateVideo.route('/getNumbers').get(getVideoDetail);

privateVideo.route('/Subscription').all(CreateSubcription);

export default privateVideo;