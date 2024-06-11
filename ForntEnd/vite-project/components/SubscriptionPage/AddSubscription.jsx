// import {Razorpay}  from 'razorpay'
import {useState} from 'react'

const Subscription = () => {

    const [subscribeData, setSubData] = useState([])

    const planeSelected = (e) => {
        let planId = {planeId : e.target.id}

        const fetchData = async() => {
            const response = await  fetch('http://127.0.0.1:3000/privateVideo/Subscription', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(planId)
            });

            if(response.status == 400){
                return 'Somthing wrong'
            }
            const data = await response.json();
            setSubData(data);
            handlerPayments(data.result.id);
        }
        fetchData()
    }

    console.log(subscribeData)

    const handlerPayments = () => {
        const options = {
            key_id: 'rzp_test_Lf5M9mNYXczfOY',
            subscription_id: subscribeData.result.id,
            name: 'Your Company Name',
            description: 'Test Transaction',
            handler: function (response) {
                alert('Payment successful');
                console.log(response);
            },
            prefill: {
                name: 'Your Name',
                email: 'your.email@example.com',
                contact: '9999999999'
            },
            notes: {
                address: 'Your Address'
            },
            theme: {
                color: '#F37254'
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open()
    }


    return(
        <>

            <h1 className='text-center text-3xl'>This is Subscription Plans</h1>

            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Vedio</h2>
                        <p className="text-2xl font-bold mb-4">2,000 <span className="text-sm text-gray-500">/mo</span></p>
                        <p className="mb-4">One months subscription</p>
                        <p className="mb-6 text-center">Enjoy and Learning</p>
                        <button id="plan_OLPEW3S6d6FbaP" className="bg-blue-500 text-white py-2 px-4 rounded">Subscribe</button>
                    </div>

                    <div className="bg-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Vedio</h2>
                        <p className="text-2xl font-bold mb-4">3,000 <span className="text-sm text-gray-500">/mo</span></p>
                        <p className="mb-4">One months subscription</p>
                        <p className="mb-6 text-center">Enjoy and Learning</p>
                        <button id="plan_OLPEW3S6d6FbaP" className="bg-blue-500 text-white py-2 px-4 rounded">Subscribe</button>
                    </div>

                    <div className="bg-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Vedio</h2>
                        <p className="text-2xl font-bold mb-4">4,000 <span className="text-sm text-gray-500">/mo</span></p>
                        <p className="mb-4">One months subscription</p>
                        <p className="mb-6 text-center">Enjoy and Learning</p>
                        <button id="plan_OLPEW3S6d6FbaP" onClick={planeSelected} className="bg-blue-500 text-white py-2 px-4 rounded">Subscribe</button>
                    </div>
                </div>
            </div>
        </>
    )
}



export {Subscription}