import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import 'axios';

function Header(){
    const [useCategory, setCategory] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response  = await fetch("http://127.0.0.1:3000/main/categories")
            const data = await response.json();

            setCategory(data);
        }
        fetchData();
    }, [])

    return(
        <>
        <nav className="bg-gray-800" onMouseLeave={handleMouseLeave}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center" >
                        <Link to="/" className="text-white">Home</Link>
                        <div className="" >
                            <div className="ml-10 flex items-baseline space-x-1"  >
                                <div 
                                    className="relative" 
                                    onMouseEnter={handleMouseEnter} 
                                >
                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Products
                                    </button>
                                    {dropdownOpen && (
                                        <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {useCategory.map((item, index) => (
                                                    <Link 
                                                        key={index}
                                                        to={`/products/${item.main_category}`} 
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                        role="menuitem"
                                                    >
                                                        {item.main_category}
                                                    </Link>
                                                ))}
                                                    
                                                
                                            </div>
                                        </div>
                                    )}
                                </div>
                        
                                <Link 
                                    to="/cart" 
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Cart
                                </Link>

                                <Link 
                                    to="/premiumVideo" 
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Prime Videos
                                </Link>
                                
                                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Header;