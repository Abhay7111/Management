import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Css/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Dashboard from './Pages/Dashboard.jsx';

const routes = createBrowserRouter([
  {path:'/', element:<Home/>, children:[
    {path:'/', element:'ghg'},
    {path:'dashboard', element:<Dashboard/>},
  ]},
  {path:'*', element:<Home/>},
])

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>
)
