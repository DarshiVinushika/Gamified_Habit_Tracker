// src/components/LoginPage.jsx
import React, { useState } from "react";
import { loginUser } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
  
      <main className="flex-grow flex items-center justify-center px-4 bg-gray-100">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            Login
          </h2>
  
          {errorMsg && <p className="text-red-500 mb-4 text-sm text-center">{errorMsg}</p>}
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </main>
  
      <Footer />
    </div>
  );
  
}

export default LoginPage;
