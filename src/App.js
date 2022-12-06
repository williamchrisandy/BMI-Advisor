import React, { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.js"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Advisor from "./pages/Advisor";
import NavBar from "./components/NavBar";

function App()
{
  const [username, setUsername] = useState("");

  var callback =
  (username) =>
  {
    setUsername(username);
  }

  return (
    <Router>
      <div>
        <NavBar username={username}/>
        <Routes>
          <Route exact path="/logout" element={<Logout x={false} parentCallback = {callback}/>} />
          <Route exact path="/" element={<Home username={username}/>} />
          <Route exact path="/login" element={<Login parentCallback = {callback}/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/calculator" element={<Calculator username={username}/>} />
          <Route exact path="/advisor" element={<Advisor/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
