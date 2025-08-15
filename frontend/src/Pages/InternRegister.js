import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import ireg from '../assets/ireg.jpg';
import logo from '../assets/logo.png';
import HomeFooter from "../Components/HomeFooter";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [profilePicFile, setProfilePicFile] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("role", "intern");
            if (profilePicFile) {
                formData.append("profilePic", profilePicFile);
            }

            await axios.post("http://localhost:8080/api/users/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Admin registered successfully!");
            navigate("/login");
        } catch (err) {
            const message =
                err.response?.data?.message || "Registration failed. Try again.";
            setErrorMsg(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
        <div className="flex min-h-screen bg-gray-100" style={{ backgroundColor: "#E6E6FA" }}>
            <main className="flex-grow flex items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: `url(${ireg})` }}>
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                    <img
                        src={logo}
                        alt="HabitHero Logo"
                        className="h-20 rounded-full shadow-md hover:scale-110 transition-transform duration-300 border border-purple-700 "
                    />
                    <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                        Register
                    </h2>

                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label
                                htmlFor="profilePic"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profilePic"
                                name="profilePic"
                                accept="image/*"
                                onChange={(e) => setProfilePicFile(e.target.files[0])}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
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
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition
                flex justify-center items-center
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
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
                            {loading ? "Registering..." : "Register Admin"}
                        </button>
                    </form>
                    {/* Add this section for the login link */}
                    <div className="mt-4 text-sm">
                        <p className="text-gray-600 ml-20">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
                {/* Back button */}
                <Link
                    to="/login"
                    className="absolute top-1 left-1 bg-white rounded-full p-3 shadow-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-110"
                    title="Back to login"
                >
                    <FaArrowLeft className="text-xl text-indigo-600" />
                </Link>
            </main>
        </div>
        <HomeFooter />
    </div>
    );
};

export default Register;
