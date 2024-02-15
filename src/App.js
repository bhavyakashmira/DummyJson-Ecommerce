import logo from './logo.svg';
import { Route, BrowserRouter as Router , Routes ,Navigate, useNavigate } from 'react-router-dom';
import LoginInPage from './Pages/Login';
import SignInPage from './Pages/Sigin';
import LandingPage from './Pages/HomePage';
import { auth } from "../src/Firebase/Firebase.js"
import React,{useEffect ,useState} from 'react';



function App() {





  const PrivateRoute = ({ children }) => {
     
    const navigate = useNavigate();
    useEffect(() => {
      let user = auth.currentUser;
      if (!user) {
        navigate('/login')
      }
    })

    return  children ;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute><LandingPage/></PrivateRoute>} path='/' />
          <Route element={<SignInPage />} path='/signin' />
          <Route element={<LoginInPage />} path='/login' />
          <Route path='*' element={ <Navigate to='/login' />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
