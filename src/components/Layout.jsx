import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 1. Import Outlet and useLocation
import Sidebar from './Sidebar';
import { Menu, Search, Bell, Settings, User } from 'lucide-react';

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // 2. Derive the title from the URL path for a "Real" ERP feel
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path || path === 'home') return 'Dashboard Overview';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-50 flex overflow-hidden font-sans">
      
      {/* 1. SIDEBAR WRAPPER */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Pass onClose to Sidebar so mobile menu closes after clicking a link */}
        <Sidebar onClose={() => setIsMobileOpen(false)} />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative p-0 lg:p-3 xl:p-4">
        
        {/* INNER WRAPPER (The "Canvas") */}
        <div className="flex-1 flex flex-col bg-white lg:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none lg:border lg:border-slate-100 overflow-hidden">
          
          {/* Top Integrated Header */}
          <header className="h-16 lg:h-20 px-4 sm:px-8 flex items-center justify-between border-b border-slate-50 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">{getPageTitle()}</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Active</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Search - Refined styling */}
              <div className="hidden md:flex items-center bg-slate-50 border border-slate-200/50 px-3.5 py-2 rounded-xl w-48 lg:w-64 focus-within:bg-white focus-within:border-slate-300 transition-all duration-200">
                <Search size={15} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="bg-transparent border-none outline-none text-xs font-medium ml-2.5 w-full placeholder:text-slate-400 text-slate-700" 
                />
              </div>

              <div className="flex items-center gap-1.5 lg:gap-3">
                <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative">
                  <Bell size={18} strokeWidth={2} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>
                
                <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-200 transition-transform active:scale-95">
                    <User size={18} />
                  </div>
                  <div className="hidden xl:block text-left">
                     <p className="text-xs font-bold text-slate-900 leading-none">Admin Owner</p>
                     <p className="text-[9px] font-semibold text-slate-400 uppercase mt-1">Gym Master</p>
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* 3. DYNAMIC CONTENT AREA */}
          <main className="flex-1 overflow-y-auto bg-[#fcfcfc]/50">
            <div className="p-4 sm:p-8 lg:p-10 max-w-[1600px] mx-auto">
              <Outlet /> {/* This renders Home.jsx or any other sub-page */}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Dark Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;