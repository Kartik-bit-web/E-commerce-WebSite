import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

function LogInUser(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:3000/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json()

        if(response.status == 200){
            Cookies.set("userInfo", JSON.stringify(data));
            Cookies.set('UserTrue', 'true');
            return navigate('/')
        }
    }
        
    return(
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-5 text-center">Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
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

export default LogInUser;