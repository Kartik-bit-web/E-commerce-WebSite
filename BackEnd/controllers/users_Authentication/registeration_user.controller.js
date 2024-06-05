import connections from "../../index.js";
import {mailSender} from "../../utilities/forgot_password_email.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registeration_user = async (req, res) => {
    const {name, email, password} = req.body; 

    //Validations 
    if((name && email && password) == ""){
        return res.status(401).json({'err': 'fill all fileds'});
    };

    if(password.length <= 8){
        return res.status(401).json({'err': 'Password Should Be Greater Than 7 Character'})
    }

    //Check if user already registered with same email:-
    try {
        const checkUserExists = async (email) => {
            try {
                // Execute SELECT query to check if user with the specified email exists
                const query = 'SELECT email FROM registeration_user WHERE email = ?';
                await connections.query(query, [email], async (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result.length > 0){
                        res.status(200).json({"Data": "User ALready Exists"})
                    }
                    else{
                        // console.log(name, email, password)
                        const E_password = await bcrypt.hash(password, 10);
                        const sql = `INSERT INTO registeration_user (name, email, password) VALUES(?, ?, ?)`
                        const values = [name, email, E_password];
                        const disit = Math.floor(100000 + Math.random()* 900000);

                        await connections.query(sql, values, async (err, result) => {
                            if(err){
                                console.log(err)
                            }
                            await mailSender(disit);
                            let hashed = await bcrypt.hash(String(disit), 10);
                            let data = {code: hashed};
                            let make_hashed_as_token = await jwt.sign(data, 'thisismysecretid', {expiresIn: '1h'});
                            // res.cookie("some" , make_hashed_as_token);
                            res.status(200).json({make_hashed_as_token, email: email, name: name});
                            
                        })
                        
                    }
                });
            } catch (error) {
                console.error('Error checking user existence:', error);
                throw error; 
            }
        };
        await checkUserExists(email);
        
    } catch (error) {
        console.log(error);
    }
    
}

export default registeration_user;