import connections from "../../index.js";

const mainPage = async (req, res)=> {
    let sql = `SELECT id, name, image, link, actual_price, ratings FROM category WHERE ratings > 4.9 LIMIT 30`
    await connections.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        return res.status(200).json(result);
    })
}

const categories = async (req, res)=> {
    let sql = `SELECT DISTINCT main_category FROM category`
    await connections.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        res.status(200).json(result)
    })
    
}

const sub_categories = async (req, res)=> {
    let sql = `SELECT DISTINCT sub_category FROM category`
    await connections.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        res.status(200).json(result)
    })    
}

const products = async (req, res)=> {

    let sql = `SELECT id, name, image, link, main_category, actual_price, ratings FROM category WHERE main_category = "${req.params.id}" LIMIT 200`
    await connections.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        res.status(200).json(result)
    })
    
}

const setProducts = async (req, res)=> {
    let sql = `SELECT id, name, image, link, main_category, actual_price, ratings FROM category WHERE id = "${req.params.id}" `
    await connections.query(sql, async (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.status(200).json(result);
    }) 
    
}

const AddToCart = (req, res) => {
    let useit = JSON.parse(cartInfo);

    res.status(200).json(useit);
}

export {
    mainPage,
    categories,
    sub_categories,
    products,
    AddToCart,
    setProducts
};