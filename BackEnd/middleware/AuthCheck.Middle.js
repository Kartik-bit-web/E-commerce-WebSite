import connections from "../index.js";

const AuthCheck = async (req, res, next) => {
    console.log(req.params)
    console.log(req.body)
    const sql = `SELECT email FROM registeration_user WHERE email = '${req.body?.email}' `;
    await connections.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            next()
        }else{
            return res.status(401).json({"data":  " You are not LoggedIn!"})
        }
    })
}

export {
    AuthCheck
}