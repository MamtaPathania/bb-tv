// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../pages/Card';
import Carousel from '../pages/Carousel';
import loadingImg from '../assets/bb.png'; // Import your loading image here

import Navbar from '../pages/Navbar';
import { baseUrl } from '../api/api';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
// import { baseUrl } from '../api/api';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate=useNavigate()
  
  useEffect(() => {
    const checkCookie = () => {
      const number = Cookies.get('number');
      if (!number) {
        navigate('/login');
      }
    };

    checkCookie();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos`);
        console.log(response, "response");
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err,"error");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <img src={loadingImg} alt='Loading...' className='w-[400px] h-[300px]'/>
        {/* <p>Loading...</p> */}
      </div>
    );
  }

  return (
    <div className='pb-6 '>
      <Navbar/>
              <Carousel videos={videos} />

        <h1 className='lg:mt-6 lg:mx-10 lg:px-6 lg:text-2xl text-xl mx-6 px-4 mt-10 text-black bg-[#e8dcf4] rounded-t-lg lg:pt-4 font-semibold '>EXPLORE VIDEOS...</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-4 gap-3 shadow-lg bg-[#e8dcf4] lg:mx-10 lg:px-6 rounded-b-lg pb-4 px-2 mx-6">
        {videos.map(video => (
          <Card
            key={video.id}
            image_url={video.image_url}
            // title={`Video ${video.id}`}
            id={video.id}
            name={video.name}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
