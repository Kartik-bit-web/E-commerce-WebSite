import { useState, useEffect} from "react";

function Home(){
    const [ useData, setUseData] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
            try {
                // Fetch data from the server
                const response = await fetch('http://127.0.0.1:3000/main');
                const data = await response.json();
                // console.log(data)
        
                setUseData(data);
                
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, []);
    
    return(
        <>
          <h1 className="text-3xl font-bold text-red-500 underline text-center"> This is Home:- </h1> 
          <h2>{useData.length}</h2>
          <hr />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
                {useData.map((item, index) => (
                    <div className="max-w-xs sm:max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                        <img className="w-full" src={item.image} alt="Image 1" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{index}</div>
                            <p className="text-gray-700 text-base">{item.name}</p>
                            <p className="text-gray-700 text-base">{item.actual_price}</p>
                        </div>
                        <div classNameName="px-6 py-4">
                            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Cart
                            </a>
                        </div>
                    </div>
                ))}
            </div>


           
        </>
    )
}

export default Home;