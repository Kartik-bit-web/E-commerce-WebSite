import { Router } from "express";
import { getVideoDetail, privateControl } from "../controllers/product_private/privateVideo.controller.js";


const privateVideo = Router();

privateVideo.route('/myvideo/:videoName').get(privateControl);
privateVideo.route('/getNumbers').get(getVideoDetail);

export default privateVideo;