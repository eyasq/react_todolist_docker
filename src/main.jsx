import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Form from './components/Form.jsx'
import Display from './components/Display.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element: <App></App>,
    children:[{
      path:"/add",
      element: <Form></Form>
    },
    {
      path:"/display",
      element: <Display></Display>
    }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
