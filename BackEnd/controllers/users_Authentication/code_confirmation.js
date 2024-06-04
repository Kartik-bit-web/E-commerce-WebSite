import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const code = async (req, res) => {
    let code_is = req.cookies.some;
    await jwt.verify(code_is, 'thisismysecretid', async (err, compare) => {
        if(err){
            return res.status(400).json({"data": "Time Out"});
        }
        let decode = await bcrypt.compare(String(req.body.code), compare.code);
        if(decode){
            return res.status(200).json({"data": "code Confiermation Success! "});
        }
        else{
            return res.status(400).json({"data": "code Confiermation failed! "});
        }
    });
    
}

export default code;