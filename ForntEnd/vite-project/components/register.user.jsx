import { useState} from "react";
import { Link, useNavigate}  from "react-router-dom";
import Cookies from 'js-cookie';

function RegisterUser(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:3000/registeration", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        console.log(data)
        
        if(response.status === 200){
            // console.log(data)
            Cookies.set('code', data.make_hashed_as_token, {expires: 600});
            return navigate('/login')
        }
        
    };

    return(
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            />
                        </div>
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
                    to={'/login'}
                    className="text-blue-700 hover:text-blue-400"
                    >
                        <a> Already registered? kick-me-here </a>
                    </Link>
                </div>
                
            </div>
        
        </>
    )
}

export default RegisterUser;