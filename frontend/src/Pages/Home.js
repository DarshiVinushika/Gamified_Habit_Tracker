import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
    >
      <Navbar />
      <main className="flex-grow md:ml-64">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;