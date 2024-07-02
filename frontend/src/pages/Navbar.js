import React from 'react'
// import img from '../assets/logo bb.png'
import img from '../assets/bb.png'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate()
  const handleClick=()=>{
    navigate('/')
  }
  return (
    //bg-[#97d3ac]
    //7FECE6]
    <div className='lg:pt-2 pt-1'>
        <div className='flex justify-center items-center bg-black shadow-2xl shadow-fuchsia-300 lg:mx-8 mx-4 rounded '>
        <img onClick={handleClick}
        src={img} alt="bubble tv" className='lg:w-[260px] lg:h-[100px] w-[230px] h-[100px]'/>

        </div>
    </div>
  )
}

export default Navbar
