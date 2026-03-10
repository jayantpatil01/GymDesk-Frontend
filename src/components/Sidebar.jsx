import React from 'react';
import { 
  LayoutDashboard, Users, Calendar, 
  CreditCard, BarChart3, Settings, LogOut, 
  Dumbbell, ChevronRight 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../configs/logout.js';

const NavSection = ({ title, children }) => (
  <div className="mb-8">
    <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
      {title}
    </p>
    <div className="space-y-1">{children}</div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`
      w-full relative flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group
      ${active 
        ? 'bg-slate-900 text-white shadow-md' 
        : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'}
    `}
  >
    <div className="flex items-center gap-3">
      <div className={`
        p-1 rounded-lg transition-all duration-300
        ${active ? 'bg-white/10' : 'bg-transparent group-hover:bg-white'}
      `}>
        <Icon size={18} strokeWidth={active ? 2 : 1.5} />
      </div>
      <span className="text-[13.5px] font-medium tracking-tight">{label}</span>
    </div>
    
    {badge ? (
      <span className={`
        text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors
        ${active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'}
      `}>
        {badge}
      </span>
    ) : (
      <ChevronRight 
        size={14} 
        className={`transition-all duration-300 transform 
          ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
        `} 
      />
    )}

    {active && (
      <div className="absolute left-[-1rem] w-1 h-6 bg-slate-900 rounded-r-full" />
    )}
  </button>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  /* -------- LOGOUT HANDLER -------- */
  const handleSignOut = () => {
    // We pass navigate to the logout function so it can redirect the user
    logout(navigate);
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] border-r border-slate-200 p-5 select-none font-sans">
      
      {/* 1. BRANDING */}
      <div className="flex items-center gap-3.5 px-3 mb-12 mt-4">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 shrink-0">
          <Dumbbell className="text-white" size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tighter text-slate-900 leading-none">GYMDESK</span>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        
        <NavSection title="Main Operations">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={isActive('/home')} 
            onClick={() => navigate('/home')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Members" 
            active={isActive('/members')}
            onClick={() => navigate('/members')} 
            badge="1,240"
          />
          <SidebarItem 
            icon={Calendar} 
            label="Schedules" 
            active={isActive('/schedules')}
            onClick={() => navigate('/schedules')}
          />
        </NavSection>

        <NavSection title="Financial Data">
          <SidebarItem 
            icon={CreditCard} 
            label="Billing" 
            active={isActive('/billing')}
            onClick={() => navigate('/billing')}
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Revenue" 
            active={isActive('/revenue')}
            onClick={() => navigate('/revenue')}
          />
        </NavSection>

      </div>

      {/* 3. SYSTEM FOOTER */}
      <div className="mt-auto pt-6 border-t border-slate-200/60">
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={isActive('/settings')}
          onClick={() => navigate('/settings')}
        />
        
        {/* LOGOUT BUTTON */}
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-[13.5px] font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group"
        >
          <LogOut size={18} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;