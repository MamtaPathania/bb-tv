import {ThreeDots} from 'react-loader-spinner'

const Loader=()=>{
    return(
        <div className='flex justify-center items-center '>
<ThreeDots 
height="50" 
width="40" 
radius="10"
color="white" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
        </div>
    )
}
export default Loader