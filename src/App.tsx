import React from "react"
import KaryawanPage from "./pages/KaryawanPage"
import {  Routes, Route } from "react-router";

// Route application

const App:React.FC = () =>{
  
  return(
  
    <Routes>
      <Route index element={<KaryawanPage/>}/>

    </Routes>
  
  )
}

export default App