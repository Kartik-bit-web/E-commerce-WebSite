import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

function PrivateVideo(){
    const [useVideo, setVideo] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const response = await fetch("http://127.0.0.1:3000/privateVideo/getNumbers");
            const data = await response.json()
            setVideo(data)
        }
        getVideos();
    }, []);

    return(
        <>

            <h1 className="p-3 text-center text-2xl text-red-500">Premimum videos</h1>
            <hr />

            <div className="p-3 ">

                {useVideo.map((video, index) => (
                    <Link 
                        key={index}
                        to={`/primeVideos/${video}`}>
                            <div className="p-2 text-blue-500 hover:text-blue-300">
                                <p>{video}</p>
                            </div>
                    </Link>
                ))}

            </div>
        
        
        </>
    )
}

export default PrivateVideo;