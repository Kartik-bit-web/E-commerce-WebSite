import nodemailer from 'nodemailer';
import {envData} from '../envdata.js';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envData.mailData.Email,
        pass: envData.mailData.Pass
    }
});



async function mailSender(code){
    
    const mailOptions = {
        from: 'dawonminati@gmail.com',
        to: 'km8469879@gmail.com',
        subject: 'Confiermation 6 Disit Number Code:- ',
        text: `Your Confiermation Code is: ${code}`
    };

    await transport.sendMail(mailOptions, (err, info) => {
        if(err){
            return console.log(err)
        }
        console.log(info)
        
    });

    return true;
}

export {mailSender};