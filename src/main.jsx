import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Css/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Dashboard from './Pages/Dashboard.jsx';
import Error from './Components/Error.jsx';
import Profile from './Components/Profile.jsx';
import Spreadsheet from './Components/Spreadsheet.jsx';

const routes = createBrowserRouter([
  {path:'/', element:<Home/>, children:[
    {path:'/', element:'ghg'},
    {path:'dashboard', element:<Dashboard/>, children:[
      {path:'students', element:<Spreadsheet/>},
      {path:'*', element:<Error/>},
    ]},
    {path:'profile', element:<Profile/>},
    {path:'*', element:<Error/>},
  ]},
])

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>
)
