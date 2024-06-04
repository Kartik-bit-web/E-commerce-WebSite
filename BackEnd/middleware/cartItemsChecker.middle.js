import connections from "../index.js";

const verifyContent = async (req, res, next) => {
    const getCart = req.cookies.setCart;
    const arr = JSON.parse(getCart);
    const global = []

    for (let i = 0; i < arr.length; i++) {
        let sql = `SELECT id, name, actual_price FROM category WHERE id = ${arr[i]}`
        try {
            const result = await new Promise((resolve, reject) => {
                connections.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            global.push(result);
            
        } catch (err) {
            console.error('Error:', err);
        }       
    }
    res.cookie("setCookie", JSON.stringify(global));
    next()
}

export {
    verifyContent
}