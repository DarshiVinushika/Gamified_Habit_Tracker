import React from "react";
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaGamepad,
  FaStar,
  FaBolt,
  FaCookie,
  FaShieldAlt,
  FaFileAlt
} from "react-icons/fa";
import { 
  FiHome, 
  FiGrid, 
  FiInfo, 
  FiTarget, 
  FiArrowUp,
  FiMail,
  FiPhone
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden mt-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="flex-1 lg:flex-[2] space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                <FaGamepad className="text-white text-xl" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  HabitHero
                </h1>
                <FaStar className="text-yellow-400 text-lg animate-pulse" />
              </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed max-w-md flex items-start gap-2">
              <FaBolt className="text-yellow-400 mt-1 flex-shrink-0" />
              <span>
                Transform your daily routines into epic adventures. Earn XP, unlock achievements, 
                and level up your life one habit at a time.
              </span>
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {[{ icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { icon: FaGithub, href: "https://github.com", label: "GitHub" },
                { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                  title={label}
                >
                  <Icon className="text-lg text-slate-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h3>
            
            <nav className="flex flex-col space-y-2">
              {[{ icon: FiHome, href: "#home", label: "Home" },
                { icon: FiGrid, href: "#features", label: "Features" },
                { icon: FiInfo, href: "#about", label: "About" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <Icon className="text-blue-400 group-hover:text-purple-400 transition-colors" />
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 relative">
              Get in Touch
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h3>
            
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <FiMail className="text-blue-400" />
                <span>habithero@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FiPhone className="text-purple-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
            <p className="text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} 
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mx-1">
                HabitHero
              </span> 
              Your habits, your adventure. All rights reserved.
            </p>
            
            <div className="flex gap-4 text-slate-400 flex-wrap justify-center md:justify-end">
              <a href="#privacy" className="flex items-center gap-1 hover:text-white transition-colors">
                <FaShieldAlt className="text-xs" />
                Privacy Policy
              </a>
              <a href="#terms" className="flex items-center gap-1 hover:text-white transition-colors">
                <FaFileAlt className="text-xs" />
                Terms of Service
              </a>
              <a href="#cookies" className="flex items-center gap-1 hover:text-white transition-colors">
                <FaCookie className="text-xs" />
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 group z-50"
        title="Back to Top"
      >
        <FiArrowUp size={18} className="group-hover:animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;
