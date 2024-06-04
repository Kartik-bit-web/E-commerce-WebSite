import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function CheckOut(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        number: '',
        address: '',
        pincode: ''
    });

    const onChangeForm = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value})
    }

    const formHandle = async (e) => {
        e.preventDefault();
        try {
            const options = {
                key: 'rzp_test_Lf5M9mNYXczfOY', // Replace with your Razorpay key_id
                amount: formData.amount,
                currency: formData.currency,
                name: 'E-commerce',
                description: 'Test Transaction',
                order_id: Cookies.get('createId'),
                handler: async function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    Cookies.set('PaymentId', response.razorpay_payment_id);
                    const payData = {
                        payment: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature
                    }
                    
                    try {

                        const response = await fetch('http://127.0.0.1:3000/payment/checkOut', 
                            {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payData)
                            }
                        )

                        if(!response.ok){
                            console.log("Something wrong to fetch")
                        }

                        // const result = await response.json();
                        Cookies.remove('createId')
                        return navigate('/cart')

                    } catch (error) {
                        console.log(error)
                    }
                },
                prefill: {
                  name: formData.fullName,
                  email: 'email@example.com', // Add email field in your form and use it here
                  contact: formData.number
                },
                notes: {
                  address: formData.address,
                  pincode: formData.pincode
                },
                theme: {
                  color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100  relative overflow-hidden ">

                <div className="max-w-7xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                            <span><img src='' alt='' className="h-16 w-16"/></span> 
                            <div className="space-y-2">
                                <p className="text-slate-800">Learn how to make a glowing gradient background!</p>
                            </div>
                        </div>
                    </div> 
                </div>
                
                <br />

                <div className="max-w-7xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                            <span><img src='' alt='' className="h-16 w-16"/></span> 
                            <div className="space-y-2">
                                <p className="text-slate-800">Learn how to make a glowing gradient background!</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <br />

                <form onSubmit={formHandle} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="number">Number</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            name="number"
                            id="number"
                            value={formData.number}
                            onChange={onChangeForm}                      
                            />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={onChangeForm}
                            />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="PinCode">Pin Code</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            name="PinCode"
                            id="PinCode"
                            value={formData.PinCode}
                            onChange={onChangeForm}                        
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>

            </div>
            
        </>
    )
}

export default CheckOut;