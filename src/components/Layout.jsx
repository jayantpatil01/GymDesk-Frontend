import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, User, Clock, Calendar as CalIcon } from 'lucide-react';
import API from '../configs/Api';

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await API.get('/admin/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAdminData(res.data.admin);
        }
      } catch (error) {
        console.error("Error fetching admin profile", error);
      }
    };
    fetchAdminProfile();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'short', day: 'numeric', month: 'short' 
  });

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    return !path || path === 'home' ? 'Dashboard' : path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans text-slate-900">
      
      {/* 1. SIDEBAR - Responsive Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-64 shadow-2xl transition-transform duration-300 ease-in-out bg-white
        lg:relative lg:translate-x-0 lg:shadow-none lg:z-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsMobileOpen(false)} />
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-full p-0 sm:p-2 lg:p-4 transition-all duration-300">
        <div className="flex-1 flex flex-col bg-white sm:rounded-t-[1.5rem] lg:rounded-[1.5rem] border-x border-t lg:border border-slate-200/60 shadow-sm overflow-hidden">
          
          {/* HEADER SECTION */}
          <header className="h-16 lg:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileOpen(true)} 
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={20} className="text-slate-600" />
              </button>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-slate-900 tracking-tight sm:text-base">{getPageTitle()}</h1>
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{formattedDate}</span>
                  <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="hidden sm:block">{formattedTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              {/* SEARCH - Collapses on mobile */}
              <div className="hidden md:flex items-center bg-slate-100 border border-transparent focus-within:border-slate-200 focus-within:bg-white px-3 py-2 rounded-lg w-48 lg:w-64 transition-all">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs ml-2 w-full text-slate-600" />
              </div>

              <div className="flex items-center gap-1 sm:gap-4">
                {/* Status badge hidden on tiny screens */}
                {adminData?.plan_status && (
                  <div className="hidden xs:block px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter border bg-emerald-50 border-emerald-100 text-emerald-700">
                    {adminData.plan_status}
                  </div>
                )}

                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <Bell size={18} />
                </button>

                <div className="hidden sm:block w-px h-6 bg-slate-200" />
                
                {/* USER PROFILE */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[100px]">
                      {adminData ? adminData.name : 'User'}
                    </p>
                    <p className="text-[9px] font-medium text-slate-400 mt-1 uppercase">Admin</p>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {adminData ? adminData.name[0].toUpperCase() : 'U'}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto bg-white scroll-smooth">
            <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE OVERLAY - Click to close */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[55] lg:hidden transition-opacity duration-300" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
    </div>
  );
};

export default Layout;