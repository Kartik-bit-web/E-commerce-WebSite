import connections from "../../index.js";
// import {find_user} from '../../utilities/insert_in_table.js'
import bcrypt from 'bcrypt';

const login_user = async (req, res) => {
    const {email, password} = req.body;

    //Validations 
    if((email && password) == ""){
        return res.status(401).json({'err': 'fill all fileds'});
    };

    if(password.length <= 8){
        return res.status(401).json({'err': 'Password Should Be Greater Than 8 Character'});
    }

    //login configurations here:-
    try {
        // Check if the user exists
        const user = () =>{ 
            connections.query(`SELECT name, email, password FROM registeration_user WHERE email = ?`,
            [email],
            async (err, result)=> {
                if(err){return console.log(err);}

                // if (user.length === 0) {
                //     return res.status(401).json({ error: 'User not found' });
                // }
        
                const passwordMatch = await bcrypt.compare(password, result[0].password);
        
                if (passwordMatch) {
                    // res.cookie("userId", 
                    // {"email": email, "name": result[0].name}, 
                    // {httpOnly: true, signed: true})
                    
                    return res
                    .status(200)
                    .json({email: result[0].email, username: result[0].name});
                } else {
                    return res.status(401).json({ error: 'Invalid password' });
                }
            });
        }
        user();
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default login_user;