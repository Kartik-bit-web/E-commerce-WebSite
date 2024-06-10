import {useParams, useNavigate } from "react-router-dom";
import { useEffect,  useRef} from "react";
import Cookies from 'js-cookie';

const PlayVideo = () => {

  const videoRef = useRef();
  const navigate = useNavigate();

    const { videoName } = useParams();

    let getCookie = Cookies.get('userInfo');

    useEffect(() => {
      
      const fetchData = async() => {

        const response = await fetch(`http://127.0.0.1:3000/privateVideo/myvideo/${videoName}`, 
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: getCookie
          }
        )

        if(response.status === 401){
          return navigate('/login');
        }

        let data = await response.blob()
        let url = URL.createObjectURL(data);
        videoRef.current.src = url;

      }
      fetchData()
    });
    
    return(
        <>
          <div >
            <video ref={videoRef} controls />
              Your browser does not support the video tag.
          </div>
        </>
    )
}

export default PlayVideo;