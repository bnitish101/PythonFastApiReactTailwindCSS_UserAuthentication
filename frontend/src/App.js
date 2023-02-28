import React, { useEffect, useState } from 'react';
import './App.css';
import Forgot from './form/Forgot';
import Home from './form/Home';
import Login from './form/Login';
import Register from './form/Register';

function App() {
  const[page, setPage] = useState("login")
  const[token, setToken] = useState()
  
  // set auth token from localStorage if available
  useEffect(()=> {
    const auth = localStorage.getItem("auth_token")
    setToken(auth)
  }, [token])
  
  
  const choosePage = () => { 
    if (page === "login") {
      return <Login setPage={setPage} />;
    }
    if (page === "forgot") {
      return <Forgot setPage={setPage} />;
    }
    if (page === "register") {
      return <Register setPage={setPage} />;
    }
  }

  // render page wrt token home/login page
  const paegs = () => {
    if (token == null) {
      return (
        <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
            {/* <Login/> */}
            {/* <Register/> */}
            {/* <Forgot/> */}
            {choosePage()}
          </div>
        </div>
      );
    } else {
      return <Home />;
    }
  }  
  return <React.Fragment> { paegs() } </React.Fragment>;
}

export default App;
