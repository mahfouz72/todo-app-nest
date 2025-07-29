import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/login.tsx";
import Dashboard from "./pages/Dashboard.tsx";

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
