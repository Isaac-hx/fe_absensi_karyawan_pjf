import React, { useContext } from "react";
import AbsenPage from "./pages/AbsenPage";
import { Routes, Route } from "react-router";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/layout/Dashboard";
import Karyawan from "./components/layout/Karyawan";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./components/layout/Login";
import User from "./components/layout/User";
import Absensi from "./components/layout/Absensi";


const App: React.FC = () => {
  return (

    <Routes>
      {/* Rute terbuka */}
      <Route index element={<AbsenPage />} />
      <Route path="/login-admin" element={<Login />} />

      
      {/* Rute terlindungi */}
      <Route
        path="/dashboard-admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard/>} />
        <Route path="karyawan" element={<Karyawan/>} />
        <Route path="absensi" element={<Absensi/>} />
        <Route path="users" element={<User/>} />
      </Route>
    </Routes>
  );
};

export default App;
