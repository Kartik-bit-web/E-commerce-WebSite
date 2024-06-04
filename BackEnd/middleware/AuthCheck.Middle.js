import connections from "../index.js";

const AuthCheck = async (req, res, next) => {
    const sql = `SELECT email FROM registeration_user WHERE email = '${req.signedCookies.userId?.email}' `;
    await connections.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            next()
        }else{
            return res.status(400).json({"data":  " You are not LoggedIn!"})
        }
    })
}

export {
    AuthCheck
}