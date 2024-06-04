import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dawonminati@gmail.com',
        pass: 'lsedwffkfkpjepss'
    }
});



try {
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
    // mailSender();
} catch (error) {
    
    console.log(error)
}

export default mailSender;