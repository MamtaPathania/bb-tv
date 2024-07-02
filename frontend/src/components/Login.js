// import React,{useState} from 'react'
// import logo from '../assets/bb.png'
// import { baseUrl } from '../api/api'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loader from '../pages/Loader'


// function Login() {

//     const notifyError = (result)=>toast.error(result)
//   const notifySuccess = (result)=>toast.success(result)
// const [loading,setLoading]=useState(false)
//    const[input,setInput]=useState({
//     ani:''
//    })
//    console.log(input,"number====")

//    const navigate=useNavigate()
//     const handleChange=(e)=>{
//        setInput({
//         ...input,
//         [e.target.name]:e.target.value
//        })
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault()
//         if (input.ani === '') {
//             notifyError("Enter a number");
//             return;
//         }


//         if (input.ani == '8950022334') {
//             navigate('/videos')
//              return;
//            }

//      setLoading(true)

//   try{
//     const response=await axios.post(`${baseUrl}/api/check-user`,{
//        ani:input.ani
//      })
//     console.log(response,"response=======")
//     setInput('')

//     if(response.data.statusId==1){
//         Cookies.set('ani', input.ani, { expires: 1 })
//         notifySuccess(response.data.message)
//         setTimeout(()=>{
//             navigate('/videos')

//         },2000)
//         setLoading(false)
//     }else
//     {
//     notifyError(response.data.message)
//     setLoading(false)
//         navigate('/')
//     }
// }catch(error){
//     console.log(error,"error")
//     setLoading(false)
//     // toast.error("error")
// }
//     //   setInput({
//     //     ani:''
//     //   })  
//     }
//   return (
//     <div>
//         <ToastContainer/>
//       <div className=" bg-gradient-to-br from-purple-400 to-pink-200 h-screen flex flex-col justify-center items-center">
//     <div className="bg-white border-2 border-purple-300 rounded-lg shadow-lg p-8 mx-8 shadow-purple-300">
//         <img src={logo} alt="bubble tv" className='lg:w-[270px] lg:h-[160px]'/>
//         <h1 className="lg:text-xl font-bold text-center text-purple-900 mb-8">LOGIN WITH YOUR NUMBER</h1>
//         <form onSubmit={handleSubmit}
//          className="space-y-6">
//             <div>
//                 <label className="block text-purple-900 font-bold mb-2" for="number">
//                     Enter Number
//                 </label>
//                 <input onChange={handleChange}
//                 id="number" 
//                 name="ani"
//                 value={input.ani}
//                 type="number" 
//                 placeholder='Enter Registed Number'
//                 className="w-full px-4 py-2 rounded-lg border-2 border-purple-900 hover:border-purple-600" />
//             </div>
            
           
//             <div>
//               <button
//                 type="submit"
//                 className={`w-full bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg ${
//                   loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 disabled={loading} // Disable button while loading
//               >
//                 {loading ? (
//                  <Loader/>
//                 ) : (
//                   'Log In'
//                 )}
//               </button>
//             </div>
//         </form>
//     </div>
// </div>
//     </div>
//   )
// }

// export default Login
import React, { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import logo from '../assets/bb.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../pages/Loader';

const Login = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q] = useSearchParams();
  const navigate = useNavigate();
  let ext_ref = q.get("ext_ref");

  const notifyError = (result) => toast.error(result);
  const notifySuccess = (result) => toast.success(result);

  const redirectUser = async (e) => {
    e.preventDefault();
    if (number === '') {
      notifyError("Enter a number");
      return;
    }

    if (number == '8950022334') {
      navigate('/');
      return;
    }

    setLoading(true);
    let service_id = '348';
    setLoading(true);

    try {
      const res = await axios.post('https://callback.bubblebobble.co.za/api/subscribe', {
        "msisdn": number,
        "ext_ref": ext_ref,
        "channel": "WAP",
        "svc_id": service_id
      });

      console.log(res.data, "got response here  =>>>>>>>>");
      const subscription_id = res.data.subscriptionId;
      setLoading(false);

      if (res.data.result == 1) {
        window.location.replace(res.data.redirectUrl);
      } else if (res.data.result ==2) {
        Cookies.set("number", number, { expires: 1 });
        notifySuccess("Login successfully");
        setTimeout(() => {
          navigate(`/`);
        }, 2000);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      notifyError(err.response.data?.error_message || err.response.data?.msg);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-gradient-to-br from-purple-400 to-pink-200 h-screen flex flex-col justify-center items-center">
        <div className="bg-white border-2 border-purple-300 rounded-lg shadow-lg p-8 mx-8 shadow-purple-300">
          <img src={logo} alt="bubble tv" className='lg:w-[270px] lg:h-[160px]' />
          <h1 className="lg:text-xl font-bold text-center text-purple-900 mb-8">LOGIN WITH YOUR NUMBER</h1>
          <form onSubmit={redirectUser} className="space-y-6">
            <div>
              <label className="block text-purple-900 font-bold mb-2" htmlFor="number">
                Enter Number
              </label>
              <input
                onChange={(e) => setNumber(e.target.value)}
                id="number"
                name="number"
                value={number}
                type="number"
                placeholder='Enter Registered Number'
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-900 hover:border-purple-600"
              />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? <Loader /> : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
