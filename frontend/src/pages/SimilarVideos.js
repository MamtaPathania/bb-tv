import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Assuming Card.js is in the same directory
import { baseUrl } from '../api/api';

function SimilarVideos() {
  const [similarVideos, setSimilarVideos] = useState([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');


  useEffect(() => {
    const fetchSimilarVideos = async () => {
      try {
        const response = await axios.get(`/api/videos`);
        console.log(response); 
        
        if (response.data && response.data.length > 0) {
          setSimilarVideos(response.data);
        } else {
          console.error('Empty response or missing result data');
        }
      } catch (error) {
        console.error('Error fetching similar videos:', error.message);
      }
    };

    fetchSimilarVideos();
  }, []);

   const handleVideoClick = (url) => {
    console.log(url,"url")
     setCurrentVideoUrl(url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
       };

  return (
    <div className='bg-white rounded-lg lg:p-6 lg:mx-8 lg:my-6 mb-6 p-6 mx-4 my-8'>
      <h1 className='lg:text-3xl text-xl font-bold mb-4'>Similar Videos</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4'>
        {similarVideos.map((video) => (
          <Card
            key={video.id}
            image_url={video.image_url}
            id={video.id}
            name={video.name}
            onClick={() => handleVideoClick(video.video_url)}

          />
        ))}
      </div>
    </div>
  );
}

export default SimilarVideos;
