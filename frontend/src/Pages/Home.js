import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeFooter from "../Components/HomeFooter";
import Hero from "../Components/Hero";
import { FaTrophy, FaUsers, FaChartLine, FaStar, FaRocket, FaTasks, FaBuilding, FaCheckCircle } from "react-icons/fa";


const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* Modern geometric background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-purple-100/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-8 relative z-10">
            <div className={`text-center mb-10 transition-all duration-700 ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 mb-4 animate-fade-in animation-delay-200">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">About Platform</span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in animation-delay-300">
                Built for the Future
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto text-base leading-relaxed animate-fade-in animation-delay-400">
                Developed by SLT's Intern Software Development Team to empower the next generation of professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className={`transition-all duration-700 ${isVisible.about ? 'animate-fade-in-left' : 'opacity-0 -translate-x-4'}`}>
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <FaRocket className="text-white text-base group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Our Mission</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our platform empowers interns and junior employees to build positive work habits through gamification, 
                    making professional growth fun and measurable.
                  </p>
                </div>
              </div>
              
              <div className={`transition-all duration-700 ${isVisible.about ? 'animate-fade-in-right' : 'opacity-0 translate-x-4'}`}>
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <FaBuilding className="text-white text-base group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">SLT – Digital Platform Division</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Part of SLT, Sri Lanka's leading telecom provider, our Digital Platform Division fosters innovation. 
                    Guided by mentor Janaka Harambearachchi, this project inspires the next generation of professionals.
                  </p>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-700 ${isVisible.about ? 'animate-fade-in-up animation-delay-200' : 'opacity-0 translate-y-4'}`}>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-bold text-center text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">What We Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700 text-sm group/item hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                      <FaStar className="text-blue-500 mr-3 text-base group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
                      <span><strong>Habit Tracking:</strong> Log work, learning, and collaboration habits</span>
                    </li>
                    <li className="flex items-center text-gray-700 text-sm group/item hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                      <FaTrophy className="text-blue-500 mr-3 text-base group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
                      <span><strong>Gamified Experience:</strong> Earn XP, level up, and unlock badges</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700 text-sm group/item hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                      <FaChartLine className="text-blue-500 mr-3 text-base group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
                      <span><strong>Engagement Insights:</strong> Mentors monitor progress via admin panel</span>
                    </li>
                    <li className="flex items-center text-gray-700 text-sm group/item hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                      <FaUsers className="text-blue-500 mr-3 text-base group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
                      <span><strong>Leaderboard:</strong> Compete and showcase your achievements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(41, 54, 74, 0.1) 0%, transparent 50%)`
            }} />
          </div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className={`text-center mb-12 transition-all duration-700 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`}>
              <span className="text-xs font-medium text-blue-200 uppercase tracking-wider mb-4 block animate-fade-in animation-delay-200">
                Platform Features
              </span>
              <h2 className="text-3xl font-light text-white mb-4 animate-fade-in animation-delay-300">
                Powerful Tools for Growth
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto text-sm leading-relaxed animate-fade-in animation-delay-400">
                Comprehensive features designed to transform your internship experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: FaTasks, title: "Build Better Habits", color: "blue", items: [
                  "Log daily/weekly habits like work reports or code commits",
                  "Mentors assign custom habits for team goals",
                  "Track progress with visual indicators"
                ]},
                { icon: FaTrophy, title: "Gamified Progress", color: "teal", items: [
                  "Earn XP and level up with completed habits",
                  "Unlock badges like '7-Day Streak'",
                  "Track daily streaks for discipline",
                  "Celebrate milestones with special rewards"
                ]},
                { icon: FaUsers, title: "Compete & Collaborate", color: "purple", items: [
                  "Rank on the leaderboard by XP or badges",
                  "Join team challenges for bonus XP",
                  "Share achievements with your network",
                  "Build a supportive community"
                ]},
                { icon: FaChartLine, title: "Mentor Insights", color: "blue", items: [
                  "Admin panel to review logs and challenges",
                  "Analytics on habit frequency and rates",
                  "Progress tracking and reporting",
                  "Custom habit assignment capabilities"
                ]}
              ].map((feature, index) => (
                <div key={index} className={`transition-all duration-700 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  <div className={`group bg-white backdrop-blur-sm rounded-lg p-6 border border-white/30 hover:border-${feature.color}-200 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}>
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-${feature.color}-200 transition-all duration-300`}>
                      <feature.icon className={`text-${feature.color}-600 text-lg group-hover:rotate-12 transition-transform duration-300`} />
                    </div>
                    <h3 className={`text-lg font-medium text-center text-gray-900 mb-3 group-hover:text-${feature.color}-600 transition-colors duration-300`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-4 text-sm">
                      {feature.title === "Build Better Habits" ? "Develop consistent work and learning habits with ease." :
                       feature.title === "Gamified Progress" ? "Stay motivated with rewards and achievements." :
                       feature.title === "Compete & Collaborate" ? "Connect with peers and showcase progress." :
                       "Tools for mentors to support intern growth."}
                    </p>
                    <ul className="space-y-2">
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-600 text-xs group/item hover:text-blue-600 transition-colors duration-300">
                          <FaCheckCircle className={`text-${feature.color}-500 mr-2 text-xs group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* Modern geometric background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-8 relative z-10">
            <div className={`text-center mb-16 transition-all duration-700 ${isVisible['how-it-works'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 mb-6 animate-fade-in animation-delay-200">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Getting Started</span>
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in animation-delay-300">
                Simple 3-Step Process
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed animate-fade-in animation-delay-400">
                Get started in just three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "1", title: "Create Account", description: "Sign up with your intern credentials and set up your profile", color: "bg-blue-500" },
                { number: "2", title: "Set Habits", description: "Choose from predefined habits or create custom ones for your goals", color: "bg-teal-500" },
                { number: "3", title: "Track & Earn", description: "Log your progress daily and watch your XP and badges grow", color: "bg-purple-500" }
              ].map((step, index) => (
                <div key={index} className={`text-center transition-all duration-700 ${isVisible['how-it-works'] ? (index === 0 ? 'animate-fade-in-left' : index === 1 ? 'animate-fade-in-up' : 'animate-fade-in-right') : 'opacity-0'}`}>
                  <div className={`group w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-medium text-white hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer`}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
};

export default Home;