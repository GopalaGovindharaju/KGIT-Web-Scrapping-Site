import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Home from './Components/User/Home';

function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
