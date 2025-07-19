
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
      <div className="relative z-20 px-4">
        <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-orbitron font-black text-white tracking-tight sm:tracking-widest uppercase animate-fade-in-down">
          Pilaxxxxx
        </h1>
      </div>
       <div className="absolute bottom-10 z-20 flex flex-col items-center animate-bounce">
        <span className="text-white/70 text-sm">Scroll</span>
        <svg className="w-6 h-6 text-white/70 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;