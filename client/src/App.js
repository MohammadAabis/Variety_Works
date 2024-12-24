import './App.css';
import Index from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/signup' element={<Users />} />
      <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
