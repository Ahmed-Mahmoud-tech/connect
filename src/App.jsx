import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './Routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authStatus } from './store/slices/UserSlice';
import Mobile from './component/Mobile/Mobile';
import Preloader from './component/Preloader/Preloader';
import Request from './apis/axios';
function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem('token')) {
    dispatch(authStatus());
  }

  const [mobile, setMobile] = useState(false);

  const checkResolution = () => {
    if (window.innerWidth < 768 || window.innerHeight <= 500) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  window.addEventListener('resize', checkResolution);
  const [preloader, setPreloader] = useState(true);
  const preloadingFunction = () => {
    setPreloader(false);
  };

  useEffect(() => {
    checkResolution();
    window.addEventListener('load', preloadingFunction);
    return () => {
      window.removeEventListener('load', preloadingFunction);
    };
  }, []);

  return (
    <>
      <Request />
      {preloader && <Preloader />}
      <div className="App">
        {mobile && <Mobile />}
        <BrowserRouter>
          <AllRoutes />
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
