import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Login from '../views/Login/Login';
import Quiz from '../views/Quiz/Quiz';
import LiveScore from '../views/LiveScore/LiveScore';
import Home from '../views/Home/Home';
import { useSelector } from 'react-redux';
import Graph from '../views/Graph/Graph';

const AllRoutes = () => {
  let isLogin = useSelector((state) => state.user.authenticated);

  let routes;
  const currentRoutes = [
    { path: 'home', element: <Home /> },
    { path: 'quiz', element: <Quiz /> },
    { path: 'livescore', element: <Graph /> },
    { path: '*', element: <Navigate to="/home" /> },
  ];

  const unauthenticated = [
    { path: 'livescore', element: <Graph /> },
    { path: '/', element: <Login /> },
    { path: '*', element: <Navigate to="/" /> },
  ];

  isLogin
    ? (routes = useRoutes(currentRoutes))
    : (routes = useRoutes(unauthenticated));

  return routes;
};

export default AllRoutes;
