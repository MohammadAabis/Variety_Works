import './App.css';
import Index from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Login from './pages/Login';
import Image3d from './pages/3DImage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/signup' element={<Users />} />
      <Route path='/login' element={<Login />} />
      <Route path='/images' element={<Image3d />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
