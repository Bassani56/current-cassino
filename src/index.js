import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErroPage from './pages/ErroPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RoulettePage from './pages/RoulettePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErroPage/>,
    children: [
      {
        path: "HomePage",
        element: <HomePage/>
      },
      {
        path: "RoulettePage",
        element: <RoulettePage/>,
      }, 
      // {
      //   path: "/",
      //   element: <AuthPage/>
      // },
      // {
      //   path: "/select",
      //   element: <SelectClient/>
      // },
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    
    <RouterProvider router={router} />

  </React.StrictMode>
);