import React, { useContext } from "react";
import AbsenPage from "./pages/AbsenPage";
import { Routes, Route } from "react-router";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/layout/Dashboard";
import Karyawan from "./components/layout/Karyawan";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./components/layout/Login";
import User from "./components/layout/User";


const App: React.FC = () => {
  return (

    <Routes>
      {/* Rute terbuka */}
      <Route index element={<AbsenPage />} />
      <Route path="/login-admin" element={<Login />} />

      {/* rute not protected -must be deleted */}
         <Route
        path="/dashboard-demo"
        element={
            <AdminPage />
        }
      >
        <Route index element={<Dashboard/>} />
        <Route path="karyawan" element={<Karyawan/>} />
        <Route path="absensi" element={<h1>Ini Absensi</h1>} />
        <Route path="users" element={<User/>} />
      </Route>
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
        <Route path="absensi" element={<h1>Ini Absensi</h1>} />
        <Route path="users" element={<User/>} />
      </Route>
    </Routes>
  );
};

export default App;
