import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseUrl } from '../api/api';
import { FaHeart } from 'react-icons/fa';
import { BiSolidCommentDetail } from "react-icons/bi";

Modal.setAppElement('#root'); // Make sure to set the root element for accessibility

function Comments({ videoId }) {
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false); // State to manage post success message
  const [comments, setComments] = useState([]); // State to hold comments
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close

  useEffect(() => {
    fetchInitialData();
  }, [videoId]);

  const fetchInitialData = async () => {
    await fetchLikesAndStatus();
    await fetchCommentsCount();
  };

  const fetchLikesAndStatus = async () => {
    try {
      const response = await axios.post(`/api/video/getstatus`, { videoId });
      const { STATUS } = response.data.message[0];
      setLiked(STATUS === 1);
    } catch (error) {
      console.error('Error fetching likes and status:', error);
    }
  };

  const fetchCommentsCount = async () => {
    try {
      const commentsResponse = await axios.post(`/api/video/getcomments`, { videoId });
      setCommentsCount(commentsResponse.data.message[0].count);
    } catch (error) {
      console.error('Error fetching comments count:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.post(`/api/video/allcomments`,{ videoId });
      console.log(response,"fetch comments")
      setComments(response.data.message);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/video/like`, { videoId });
      const { likes, status } = response.data;
      setLikes(likes);
      setLiked(status === 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handlePost = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`/api/video/comments`, {
        message: comment,
        videoId
      });
      setPostSuccess(true); // Set post success message state
      setCommentsCount(prevCount => prevCount + 1);
      fetchComments(); // Fetch comments again to include the new comment

      // Clear success message after 2 seconds
      setTimeout(() => {
        setPostSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
    setComment('');
  };

  const openModal = async () => {
    await fetchComments(); // Fetch comments when opening the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4 p-2 lg:mx-8 mx-4 bg-black shadow">
        <div className="flex items-center lg:mx-5 mr-4" onClick={handleLike}>
          <span className='text-white ml-6'>Like :</span>
          <FaHeart size={20}
            className={liked ? "text-red-500 mr-1 ml-4 cursor-pointer" : "text-white mr-1 ml-4 cursor-pointer"}
          />
        </div>
        <div className="flex items-center" onClick={openModal}>
          <span className='text-white ml-6'>Comments :</span>
          <BiSolidCommentDetail size={20} className="text-white mr-1 ml-4 cursor-pointer" />
          <span className='text-white lg:ml-2'>({commentsCount})</span>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Comments Modal"
        className="max-w-[600px] lg:mx-auto mx-8 lg:mt-10 mt-48 p-4 bg-white rounded-lg border relative"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <div className="flex justify-end font-bold mr-6 ">
          <button onClick={closeModal} className="text-red-500 ">Close</button>
        </div>
        <div className="overflow-y-auto max-h-60 mb-4 " id="commentBox">
          {comments.map((comment, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              {comment.COMMENT}
            </div>
          ))}
        </div>
        <form onSubmit={handlePost}>
          {postSuccess && (
            <p className="text-black mt-2 text-center">Comment Posted Successfully!</p>
          )}
          <div className="px-3 mb-2 mt-2">
            <textarea
              placeholder="Write a comment......"
              className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-end px-4 mb-2">
            <input type="submit" className="px-2.5 lg:px-4.5 py-1.5 lg:py-2.5 rounded-md text-white text-sm bg-indigo-500" value="Post" />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Comments;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../api/api';
// import { FaHeart } from 'react-icons/fa';
// import { BiSolidCommentDetail } from "react-icons/bi";

// function Comments({ videoId }) {
//   const [comment, setComment] = useState('');
//   const [likes, setLikes] = useState(0);
//   const [commentsCount, setCommentsCount] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [initialFetchComplete, setInitialFetchComplete] = useState(false);
//   const [postSuccess, setPostSuccess] = useState(false); // State to manage post success message

//   useEffect(() => {
//     fetchInitialData();
//   }, [videoId]);

//   const fetchInitialData = async () => {
//     await fetchLikesAndStatus();
//     await fetchCommentsCount();
//   };

//   const fetchLikesAndStatus = async () => {
//     try {
//       const response = await axios.post(`${baseUrl}/api/video/getstatus`, { videoId });
//       const { STATUS } = response.data.message[0];
//       setLiked(STATUS === 1);
//     } catch (error) {
//       console.error('Error fetching likes and status:', error);
//     }
//   };

//   const fetchCommentsCount = async () => {
//     try {
//       const commentsResponse = await axios.post(`${baseUrl}/api/video/getcomments`, { videoId });
//       setCommentsCount(commentsResponse.data.message[0].count);
//     } catch (error) {
//       console.error('Error fetching comments count:', error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(`${baseUrl}/api/video/like`, { videoId });
//       const { likes, status } = response.data;
//       setLikes(likes);
//       setLiked(status === 1);
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const handlePost = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.post(`${baseUrl}/api/video/comments`, {
//         message: comment,
//         videoId
//       });
//       setPostSuccess(true); // Set post success message state
//       setCommentsCount(prevCount => prevCount + 1);

//       // Clear success message after 2 seconds
//       setTimeout(() => {
//         setPostSuccess(false);
//       }, 2000);
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//     setComment('');
//   };

//   return (
//     <div>
//       <div className="flex items-center mb-4 p-2 lg:mx-8 mx-4 bg-black shadow">
//         <div className="flex items-center lg:mx-5 mr-4" onClick={handleLike}>
//           <span className='text-white ml-6'>Like :</span>
//           <FaHeart size={20}
//             className={liked ? "text-red-500 mr-1 ml-4 cursor-pointer" : "text-white mr-1 ml-4 cursor-pointer"}
//           />
//         </div>
//         <div className="flex items-center">
//           <span className='text-white ml-6'>Comments :</span>
//           <BiSolidCommentDetail size={20} className="text-white mr-1 ml-4" />
//           <span className='text-white lg:ml-2'>({commentsCount})</span>
//         </div>
//       </div>
//       <form onSubmit={handlePost} className="max-w-[1800px] bg-white rounded-lg border lg:mx-8 mx-4 sm:mx-6 mt-2">
//       {postSuccess && (
//         <p className="text-black mt-2 text-center">Comment Posted Successfully!</p>
//       )}
//         <div className="px-3 mb-2 mt-2">
//           <textarea
//             placeholder="Write a comment......"
//             className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-end px-4 mb-2">
//           <input type="submit" className="px-2.5 lg:px-4.5 py-1.5 lg:py-2.5 rounded-md text-white text-sm bg-indigo-500" value="Post" />
//         </div>
//       </form>
     
//     </div>
//   );
// }

// export default Comments;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../api/api';
// import { FaHeart } from 'react-icons/fa';
// import { BiSolidCommentDetail } from "react-icons/bi";


// function Comments({ videoId }) {
//   const [comment, setComment] = useState('');
//   const [likes, setLikes] = useState(0);
//   const [commentsCount, setCommentsCount] = useState(0);
//   const [liked, setLiked] = useState(false); // Initialize liked state to false initially
//   const [initialFetchComplete, setInitialFetchComplete] = useState(false);


//   useEffect(() => {
//     fetchInitialData();
//   }, [videoId]);

//   const fetchInitialData = async () => {
//     await fetchLikesAndStatus();
//     await fetchCommentsCount();
//   };

//   const fetchLikesAndStatus = async () => {
//     try {
//       const response = await axios.post(`${baseUrl}/api/video/getstatus`, { videoId });
//       console.log(response,'+++++++++')
//       const { STATUS } = response.data.message[0];
//       // setLikes(likes);
//       setLiked(STATUS === 1); // Set liked state based on the status from backend
//     } catch (error) {
//       console.error('Error fetching likes and status:', error);
//     }
//   };

//   const fetchCommentsCount = async () => {
//     try {
//       const commentsResponse = await axios.post(`${baseUrl}/api/video/getcomments`, { videoId });
//       setCommentsCount(commentsResponse.data.message[0].count);
//     } catch (error) {
//       console.error('Error fetching comments count:', error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(`${baseUrl}/api/video/like`, { videoId });
//       const { likes, status } = response.data;
//       setLikes(likes);
//       setLiked(status === 1); // Update liked state based on the new status after toggle
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     }
//   };

//   const handlePost = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.post(`${baseUrl}/api/video/comments`, {
//         message: comment,
//         videoId
//       });
//       setCommentsCount(prevCount => prevCount + 1);
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//     setComment('');
//   };

//   return (
//     <div>
//       <div className="flex items-center mb-4 p-2 lg:mx-8 mx-4 bg-black shadow">
//         <div className="flex items-center lg:mx-5 mr-4" onClick={handleLike}>
//           <span className='text-white ml-6'>Like :</span>
//           <FaHeart size={20}
//             className={liked ? "text-red-500 mr-1 ml-4 cursor-pointer" : "text-white mr-1 ml-4 cursor-pointer"}
//           />
//         </div>
//         <div className="flex items-center">
//           <span className='text-white ml-6'>Comments :</span>
//           <BiSolidCommentDetail size={20} className="text-white mr-1 ml-4" />
//           <span className='text-white lg:ml-2'>({commentsCount})</span>
//         </div>
//       </div>
//       <form onSubmit={handlePost} className="max-w-[1200px] bg-white rounded-lg border  lg:mx-8 mx-4 sm:mx-6 mt-2">
//       <div className="px-3 mb-2 mt-2">
//           <textarea
//             placeholder="Write a comment......"
//             className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
          
//         </div>
//         <div className="flex justify-end px-4 mb-2">
//           <input type="submit" className="px-2.5 lg:px-4.5 py-1.5 lg:py-2.5 rounded-md text-white text-sm bg-indigo-500" value="Post" />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Comments;

