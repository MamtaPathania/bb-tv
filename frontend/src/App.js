import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import Navbar from './pages/Navbar';
import HomePage from './components/HomePage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import Login from './components/Login';
function App() {
  return (
    <div className='bg-[#C7A4E9] h-auto'>
<Router>
  {/* <Navbar/> */}
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<HomePage/>}/>
    <Route path="/video/:id" element={<VideoPlayerPage/>} />

  </Routes>
</Router>
    </div>
  );
}

export default App;
