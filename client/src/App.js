import './App.css';
import Index from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
