import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import DisplayZustand from './components/DisplayZustand.jsx'
import AsyncFetch from './components/Async.Fetch.jsx'
import AddZustandHookForm from './components/AddZustandHookForm.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import EditForm from './components/EditForm.jsx'
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
      path:"/async",
      element: <AsyncFetch/>
    },
    {
      path:"/edit/:id",
      element:<EditForm></EditForm>
    }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
