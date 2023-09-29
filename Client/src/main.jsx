import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './styles/index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import MessageList from './pages/MessageList.jsx'
import Auth from './pages/Auth.jsx'


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
  element:<MessageList/>
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
