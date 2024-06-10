import connections from "../../index.js";

const code = async (req, res) => {

    console.log(req.body)
    const code = req.body.code;
    const userId = req.body.userId;
    
    connections.query(`SELECT userId, code FROM useremailverify WHERE userId = ?`,
        [userId], 
        (err, result) => {
        if(err) return console.log(err);

        // console.log("Database: ", result)

        if(result[0].code == code){
            res.status(200).json({'Data': 'Success'})
        }else{
            res.status(400).json({"data": "Code Not Found"})
        }
        
    })


    ///////////////////// This Approch working as well Without using DataBbase ////////////////////////

    // import jwt from 'jsonwebtoken';
    // import bcrypt from 'bcrypt'


    // let code_is = req.cookies.some;
    // await jwt.verify(code_is, 'thisismysecretid', async (err, compare) => {
    //     if(err){
    //         return res.status(400).json({"data": "Time Out"});
    //     }
    //     let decode = await bcrypt.compare(String(req.body.code), compare.code);
    //     if(decode){
    //         return res.status(200).json({"data": "code Confiermation Success! "});
    //     }
    //     else{
    //         return res.status(400).json({"data": "code Confiermation failed! "});
    //     }
    // });
    
}

export default code;