import dotenv from 'dotenv';
import express from 'express';

//
import connections from './index.js'
import route from './routers/user.router.js';
import main from './routers/main_page.route.js';
import payment from './routers/paymentGateway.js';
import privateVideo from './routers/private.route.js';

import {} from './models/User_database/registration_user.model.js';
import {} from './models/User_database/Auth_google.models.js';
import {} from './models/User_database/Auth_github.models.js';
import {} from './models/User_database/userVerifyCode.js'

//
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

//
const app = express();
app.use(cookieParser('bbc2529f4c20249f48ccace9a8d6ecb61fad77eb'));
//

app.use(cors());
dotenv.config();

//body-parser for get value and value in JSON Data
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

//Session Cridential
app.use(session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: false
}));

//passport middlewares
app.use(passport.initialize());
app.use(passport.session());


//Routers Define Here:-

app.use('/', route);
app.use('/main', main);
app.use('/payment', payment);
app.use('/privateVideo', privateVideo)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});