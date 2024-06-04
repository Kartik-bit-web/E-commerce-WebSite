import { useParams } from "react-router-dom";

const PlayVideo = () => {
    const { videoName } = useParams();
    return(
        <>
          <div >
            <video width="100%" controls>
              <source src={`http://127.0.0.1:3000/privateVideo/myvideo/${videoName}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
    )
}

export default PlayVideo;

