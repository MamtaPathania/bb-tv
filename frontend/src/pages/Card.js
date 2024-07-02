
// import React from 'react';
// import playIcon from '../assets/play-button (2).png'; 
// import { useNavigate } from 'react-router-dom';

// function Card({ image_url, id,onClick,name }) {
//     const navigate=useNavigate()
//     const handlePlay=()=>{
//         console.log(id,"card--id---")
//         navigate(`/video/${id}`);
        

//     }
//   return (
//     <div className="group" onClick={onClick} >
//       <article className="relative isolate overflow-hidden rounded-2xl max-w-sm mx-auto lg:mt-6 mt-4 transition-all shadow-2xl shadow-fuchsia-300 duration-600 group-hover:border-8 group-hover:border-[#b684e8] cursor-pointer">
//         <img src={image_url} alt="bubbo tv" className="lg:w-full lg:h-full lg:object-cover w-[400px] h-[140px]" />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
//         <div  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <img onClick={handlePlay} src={playIcon} alt="Play Icon" className="w-14 h-14" />
//         </div>
//         <h1 className='text-bold bg-white lg:text-xl text-center pb-4'>
//           {name}
//         </h1>
//       </article>
//     </div>
//   );
// }

// export default Card;

import React from 'react';
import playIcon from '../assets/play-button (2).png'; 
import { useNavigate } from 'react-router-dom';

function Card({ image_url, id, onClick, name }) {
    const navigate = useNavigate();
    const handlePlay = () => {
        console.log(id, "card--id---");
        navigate(`/video/${id}`);
    };

    return (
        <div className="group" onClick={onClick}>
            <article className="relative isolate overflow-hidden rounded-2xl max-w-sm mx-auto lg:mt-6 mt-4 transition-all shadow-2xl shadow-fuchsia-300 duration-600 group-hover:border-8 group-hover:border-[#b684e8] cursor-pointer">
                <img src={image_url} alt="bubbo tv" className="lg:w-full lg:h-[220px] lg:object-cover w-full h-[140px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <img onClick={handlePlay} src={playIcon} alt="Play Icon" className="w-14 h-14" />
                </div>
                <div className='absolute bottom-0 w-full bg-black/30 bg-opacity-75 p-2'>
                    <h1 className='text-white lg:text-lg text-md text-center font-semibold sm:truncate overflow-hidden h-10 line-clamp-2'
                    >
                        {name}
                    </h1>
                </div>
            </article>
        </div>
    );
}

export default Card;
    