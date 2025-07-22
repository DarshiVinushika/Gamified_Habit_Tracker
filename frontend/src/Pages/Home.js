import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";  

const Home = () => {
  return (
    <div className="min-h-screen"
      style={{
        background: "radial-gradient(closest-side at 50% 50%, #3B82F6 0%, #8B5CF6 100%)",
    }}>
        <Hero />
    </div>
  );
};

export default Home;
