import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

function CartBtn(){

    const [username, setUsername] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const user = Cookies.get('AddCart') ;
        if (user) {
            setUsername(JSON.parse(user));
        }
    }, []);

    useEffect(() => {
        // Calculate the total price
        const total = username.reduce((acc, item) => {
            const price = parseFloat(item[0].actual_price.replace(/[^\d.]/g, ''));
            return acc + (isNaN(price) ? 0 : price);
        }, 0);
        setTotalPrice(total);
    }, [username]);

    const formatPrice = (price) => {
        const sanitizedPrice = price.toString().replace(/[^\d.]/g, '');
        return sanitizedPrice ? `$${sanitizedPrice}` : 'N/A';
    };

    const removeFunc = (e) => {
        const itemId = e.target.id;
        const cart = Cookies.get('AddCart');
        const cartItems = JSON.parse(cart);
        // console.log(cartItems)
        if (cart) {
            // console.log(cartItems[0])
            const updatedCartItems = cartItems.filter(item => item[0].id != itemId);
            // console.log(updatedCartItems)
            Cookies.set('AddCart', JSON.stringify(updatedCartItems));
            setUsername(updatedCartItems);
        }
    };

    //testing
    const testingHandle = async () => {
        try {
            let data = {
                amount: totalPrice,
                currency: "INR",
                receipt: "For_Products"
            }
            const response = await fetch("http://127.0.0.1:3000/payment", 
                {
                    method: 'post', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )

            if(!response.ok){
                console.log('Kuch to gadbad hai Network mei')
            }

            const re_Data = await response.json()

            if(Cookies.get('createId')){
                console.log('already Created')
            }
            Cookies.set('createId', re_Data.id)
            console.log('Created', Cookies.get("createId"));
            console.log(re_Data);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className="bg-gray-900 p-4 text-white rounded-md max-w-auto mx-auto">
            <h2 className="text-2xl font-bold mb-4 p-2 text-center">Shopping Cart</h2>
            <ul className="p-2">
                {username.length > 0 ? (
                    username.map((item, index) => (
                        <li key={index} className="mb-4 p-4 bg-gray-800 rounded">
                            <div className="flex justify-between">
                                <span className="text-white">{item[0].name}</span>
                                <span><img src={item[0].image} alt={item[0].image} className="h-16 w-16"/></span>  
                            </div>
                            <br />
                            <span className="m-2">Price: {formatPrice(item[0].actual_price)} </span>
                            <hr />
                            <br />
                            <div className="flex justify-between">
                                <span id={item[0].id} onClick={removeFunc}>Remove</span>
                            </div>
                        </li>
                        
                    ))
                ): (
                    <li className="text-center text-white">No items in the cart.</li>
                ) } 
                
            </ul>
            <div className="flex justify-between mt-4 m-10">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold">{totalPrice}</span>
            </div>
            
            <Link
            to={'/CheckOut'}>
                <div className="flex justify-center mt-6 p-4">
                    
                    <button 
                    onClick={testingHandle}
                    className="mt-6 w-2/4  px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold">
                        Checkout
                    </button>        
                </div>
            </Link>
        </div>
        </>
    )

}

export default CartBtn;