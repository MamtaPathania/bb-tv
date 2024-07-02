// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import SimilarVideos from './SimilarVideos';
// import loadingImg from '../assets/bb.png'
// import Navbar from './Navbar';
// import { baseUrl } from '../api/api';

// function VideoPlayer() {
//   const { id } = useParams();
//   const [videoUrl, setVideoUrl] = useState('');
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState('');
// console.log(videoUrl,"video=====")
//   useEffect(() => {
//     const fetchVideoUrl = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}/api/video/${id}`);
//         console.log('API Response:', response.data.message); 
//          setLoading(false)
       

//         const { video_url } = response.data.message[0];
       

//         setVideoUrl(video_url);
//       } catch (error) {
//         console.error('Error fetching video:', error.message);
//         // setError('Error fetching video');
//       } 
//     };

//     fetchVideoUrl();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <img src={loadingImg} alt='Loading...' className='w-[400px] h-[300px]'/>
//         {/* <p>Loading...</p> */}
//       </div>
//     );
//   }

//   return (
//     <div className='bg-[#C7A4E9] h-auto'>
//       <Navbar/>
//          <div className="mt-4 flex justify-center items-center lg:px-8 px-6 pb-6">
//       <ReactPlayer url={videoUrl} controls={true} playing={true} width="100%" 
       
//       />
//     </div>
//     <SimilarVideos mainVideoId={id}/>
//     </div>
   
//   );
// }

// export default VideoPlayer;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import SimilarVideos from './SimilarVideos';
import loadingImg from '../assets/bb.png'
import Navbar from './Navbar';
// import { baseUrl } from '../api/api';
import Comments from './Comments';

function VideoPlayer() {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(`/api/video/${id}`);
        const { video_url } = response.data.message[0];
        setVideoUrl(video_url);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video:', error.message);
      } 
    };

    fetchVideoUrl();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <img src={loadingImg} alt='Loading...' className='w-[400px] h-[300px]'/>
      </div>
    );
  }

  return (
    <div className='bg-[#C7A4E9] h-auto'>
      <Navbar/>
      <div className="mt-4 flex justify-center bg-black lg:mx-8 mx-4 items-center lg:px-8 px-6 ">
        <ReactPlayer url={videoUrl} controls={true} playing={true} width="100%" />
      </div>
      <Comments videoId={id}/>
      <SimilarVideos mainVideoId={id}/>
    </div>
  );
}

export default VideoPlayer;
