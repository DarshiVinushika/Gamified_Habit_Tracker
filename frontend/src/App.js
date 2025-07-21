import React from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BadgesManagementPage from "./AdminPages/BadgesManagementPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/badges" element={<BadgesManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
