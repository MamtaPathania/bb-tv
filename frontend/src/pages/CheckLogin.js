
import Cookies from 'js-cookie';


const CheckLogin = () => {
  const login = Cookies.get('ani');
  
  return !!login; 
};

export default CheckLogin