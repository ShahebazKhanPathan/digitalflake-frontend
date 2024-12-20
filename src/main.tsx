import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard.tsx'
import Roles from './components/Roles.tsx'
import EditRole from './components/EditRole.tsx'
import AddNewRole from './components/AddNewRole.tsx'
import Users from './components/Users.tsx'
import AddNewUser from './components/AddNewUser.tsx'
import EditUser from './components/EditUser.tsx'
import DashboardHome from './components/DashboardHome.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path='roles' element={<Roles />} />
          <Route path='add-role' element={<AddNewRole />} />
          <Route path='edit-role' element={<EditRole />} />
          <Route path='users' element={<Users />} />
          <Route path='add-user' element={<AddNewUser />} />
          <Route path='edit-user' element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
