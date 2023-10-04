import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './styles/index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'


const router= createBrowserRouter([
  {
    path:"/auth",
    element:<Auth/>,
   },
  {
    path:"/",
    element:<Home/>,
   },
{
  path:"/:id_pass",
  element:<Dashboard/>
}
]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)
