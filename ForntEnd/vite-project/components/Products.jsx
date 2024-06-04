import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
// import {} from 'axios';

function Products(){
    const [productData, SetProductData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respose = await fetch(`http://127.0.0.1:3000/main/products/${id}`);
                const data = await respose.json();

                SetProductData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id]);

    // const [useSetProduct, setProduct] = useState([])

    let AddToCart = async (e) => {

        try {
            const response = await fetch(`http://127.0.0.1:3000/main/setProducts/${e.currentTarget.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const existingCart = Cookies.get('AddCart');
            let cart = [];
            if (existingCart) {
                cart = JSON.parse(existingCart);
            }

            // Add the new product to the cart array
            cart.push(data)
            Cookies.set(`AddCart`, JSON.stringify(cart))
            
        } catch (error) {
            console.error(error);
        }
        
   
    }

    return(
        <>
            <h1 className="text-3xl font-bold text-red-500 underline text-center">This is Products</h1>
            <h2>{productData.length}</h2>

            <div className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 " >
                {productData.map((item, index) => (
                    <div key={index} className="max-w-xs sm:max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                        <img className="w-full" src={item.image} alt={index} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.name}</div>
                            <p className="text-gray-700 text-base">Price:- {item.actual_price}</p>
                        </div>
                        <div className="px-6 py-4 ">
                        
                            <button id={item.id} onClick={AddToCart} className=" bg-blue-500 w-2/4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Cart</button>
                                
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Products;