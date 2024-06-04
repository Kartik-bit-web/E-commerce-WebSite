import { Router } from "express";
import {
    AddToCart,
    categories,
    mainPage,
    products,
    setProducts,
    sub_categories
} from "../controllers/products_public/main_page.controllers.js";
import { AuthCheck } from "../middleware/AuthCheck.Middle.js";
import { verifyContent } from "../middleware/cartItemsChecker.middle.js";

const main = Router();

main.route('/').get(mainPage);
main.route('/categories').get(categories);
main.route('/sub_categories').get(sub_categories);
main.route('/products/:id').get(products);
main.route('/setProducts/:id').get(setProducts);
main.route('/cart').get(AuthCheck, verifyContent, AddToCart);


export default main;