import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Form from './components/Form.jsx'
import Display from './components/Display.jsx'
import HookForm from './components/HookForm.jsx'
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
    },
    {
      path:"/hookform",
      element: <HookForm></HookForm>
    }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
