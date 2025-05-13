import React from "react";
import KaryawanPage from "./pages/KaryawanPage";
import { Routes, Route } from "react-router";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/layout/Dashboard";
import Karyawan from "./components/layout/Karyawan";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./components/layout/Login";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Rute terbuka */}
      <Route index element={<KaryawanPage />} />
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
        <Route path="absensi" element={<h1>Ini Absensi</h1>} />
        <Route path="users" element={<h1>Ini User</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
