import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser, googleLogin } from "../Services/authService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import login from '../assets/login.jpg';
import logo from '../assets/logo.png';
import HomeFooter from "../Components/HomeFooter";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("intern"); // "intern" or "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Admin email/password login handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      if (data.role !== "admin") {
        setErrorMsg("Only admins can login here.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/AdminDashboard");
      toast.success("Admin logged in successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Intern Google login handler
  const handleInternGoogleLogin = async (credentialResponse) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await googleLogin(credentialResponse.credential);
      if (data.role !== "intern") {
        setErrorMsg("Only interns can login here.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/InternDashboard");
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
        <main
          className="flex-grow flex items-center justify-center px-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md mt-20 mb-20">
            <img
              src={logo}
              alt="HabitHero Logo"
              className="h-20 rounded-full shadow-md hover:scale-110 transition-transform duration-300 border border-purple-700"
            />

            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
              Login
            </h2>

            {/* Tab buttons */}
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-medium rounded-t-md ${
                  activeTab === "intern"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("intern")}
              >
                Intern
              </button>
              <button
                className={`px-4 py-2 font-medium rounded-t-md ${
                  activeTab === "admin"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("admin")}
              >
                Admin
              </button>
            </div>

            {errorMsg && (
              <p className="text-red-500 mb-4 text-sm text-center">{errorMsg}</p>
            )}

            {/* Intern Tab */}
            {activeTab === "intern" && (
              <div className="text-center space-y-4">
                <p className="text-gray-600 text-sm">
                  Please login with the email you have registered in SLT.
                </p>
                <GoogleLogin
                  onSuccess={handleInternGoogleLogin}
                  onError={() => {
                    setErrorMsg("Google login failed. Please try again.");
                    setLoading(false);
                  }}
                />
              </div>
            )}

            {/* Admin Tab */}
            {activeTab === "admin" && (
              <form onSubmit={handleAdminLogin} className="space-y-4">
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
            )}
          </div>

          {/* Back button */}
          <Link
            to="/"
            className="absolute top-1 left-1 bg-white rounded-full p-3 shadow-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-110"
            title="Back to home"
          >
            <FaArrowLeft className="text-xl text-indigo-600" />
          </Link>
        </main>
        <HomeFooter />
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;