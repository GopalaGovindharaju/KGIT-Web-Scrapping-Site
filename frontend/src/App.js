import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Home from './Components/User/Home';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  
  return (
    <GoogleOAuthProvider clientId="383967186502-jumts20u06s9unqkfifsqs3f16hv2hld.apps.googleusercontent.com">
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
