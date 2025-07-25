import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, googleLogin } from "../Services/authService";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Email/password login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/InternDashboard");
      }
      toast.success("Logged in successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google login handler
  const handleGoogleLogin = async (credentialResponse) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await googleLogin(credentialResponse.credential);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/InternDashboard");
      }
      toast.success("Logged in with Google successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* Added md:ml-64 to shift content right of sidebar on desktop */}
        <main className="flex-grow flex items-center justify-center px-4 bg-cover bg-center md:ml-64">
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
              Login
            </h2>
            {errorMsg && (
              <p className="text-red-500 mb-4 text-sm text-center">{errorMsg}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl select-none"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Or login with</p>
              <div className="mt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setErrorMsg("Google login failed. Please try again.");
                    setLoading(false);
                  }}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;