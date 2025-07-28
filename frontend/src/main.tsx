import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./login.tsx";
import Dashboard from "./Dashboard.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path:'/register',
        element: <Register/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
