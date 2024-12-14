import './App.css';
import Index from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/index' element={<Index />} />
      <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
