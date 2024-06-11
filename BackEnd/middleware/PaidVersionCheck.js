import connections from ".././index.js"

const CheckUserPaid = (req, res, next) => {
    const userData = req.body
    const sql = `SELECT engable FROM paiuser WHERE paiduser = ?`;
    const values = [userData.email];

    connections.query(sql, values, (err, result) => {
        if(err) return console.log(err);

        if(result[0]){
            return next()
        }
        
        res.status(402).json({'Data': 'Not Engable'})

    })
    
}

export {CheckUserPaid}