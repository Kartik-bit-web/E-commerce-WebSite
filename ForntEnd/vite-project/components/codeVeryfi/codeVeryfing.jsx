import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

function Verify(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        code: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData.code, Cookies.get('code'))
        let resId = {"code": formData.code, "userId": Cookies.get('code')}
        const response = await fetch('http://127.0.0.1:3000/code_confirmation', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resId)
        });

        let result = await response.json();
        console.log(result)
        if(response.status == 200){
            return navigate('/login')
        }
        else{
            return navigate('/code')
        }
        
    }
        
    return(
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-5 text-center">Verify Code</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            />
                        </div>
                    
                        <div>
                            <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            Submit
                            </button>
                        </div>
                    </form>
                    <br />

                    <Link 
                    to={'/registeration'}
                    className="text-blue-700 hover:text-blue-400"
                    >
                        <a> newuser? kick-me-here </a>
                    </Link>

                    
                </div>
            </div>
        
        </>
    )
}

export default Verify;