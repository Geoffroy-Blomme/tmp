import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import { Signin } from "./pages/SignIn";
import User from "./pages/User";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Home" element={<Home></Home>}></Route>
        <Route path="/Sign-in" element={<Signin></Signin>}></Route>
        <Route path="/User" element={<User></User>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
