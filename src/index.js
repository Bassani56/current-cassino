import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErroPage from './pages/ErroPage.jsx';
import MenuRegistro from './pages/MenuRegistro.jsx';
import Dashboards from './pages/Dashboard.jsx';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Autentication/>
//   },
//   {
//     path: "/pag",
//     element: <DashBoard />
//   }

// ])

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErroPage/>,
    children: [
      // {
      //   path: "/",
      //   element: <Register/>,
      // },
      // {
      //   path: "/",
      //   element: <AuthPage/>
      // },
      // {
      //   path: "/select",
      //   element: <SelectClient/>
      // },
      {
        path: "/",
        element: <MenuRegistro/>
      },
      {
        path: "dashboard",
        element: <Dashboards/>,
      },
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    
    <RouterProvider router={router} />
    

  </React.StrictMode>
);