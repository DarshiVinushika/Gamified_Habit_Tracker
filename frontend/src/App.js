import React from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;