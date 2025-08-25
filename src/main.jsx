import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import DisplayZustand from './components/DisplayZustand.jsx'
import AddZustandHookForm from './components/AddZustandHookForm.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import EditForm from './components/EditForm.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout></Layout>,
    children:[
      {
        path:"/",
        element: <Home></Home>
      },
    {
      path:"/zustand",
      element: <AddZustandHookForm></AddZustandHookForm>
    },
    {
      path:"/displayzustand",
      element: <DisplayZustand></DisplayZustand>
    },
    {
      path:"/edit/:id",
      element:<EditForm></EditForm>
    },
    {
      path:"/register",
      element:<Register></Register>
    },
    {
      path:'/login',
      element:<Login></Login>
    }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
