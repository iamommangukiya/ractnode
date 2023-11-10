import React from "react";
import Login from "./Pages/Login";
import Ragistration from "./Pages/Ragistration";
import Router from "router";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/ragi" element={<Ragistration/>}></Route>
      </Routes>
    
    </>
  );
}

export default App;
