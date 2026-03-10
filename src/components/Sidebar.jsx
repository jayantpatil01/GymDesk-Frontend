import React from 'react';
import { 
  LayoutDashboard, Users, Calendar, 
  CreditCard, BarChart3, Settings, LogOut, 
  Dumbbell, ChevronRight 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../configs/logout.js';

const NavSection = ({ title, children }) => (
  <div className="mb-6 last:mb-0">
    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
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
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]'}
    `}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} strokeWidth={active ? 2.5 : 2} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
      <span className="text-[13px] font-semibold tracking-tight">{label}</span>
    </div>
    
    {badge ? (
      <span className={`
        text-[10px] px-2 py-0.5 rounded-md font-black transition-colors
        ${active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}
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
  </button>
);

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => logout(navigate);

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose(); 
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200 select-none font-sans overflow-hidden">
      
      {/* BRANDING */}
      <div className="flex items-center gap-3 px-8 mb-10 mt-8">
        <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 shrink-0">
          <Dumbbell className="text-white" size={18} strokeWidth={2.5} />
        </div>
        <span className="text-base font-black tracking-tighter text-slate-900 uppercase">GymDesk</span>
      </div>

      {/* NAVIGATION - Scrollable if too many items */}
      <div className="flex-1 overflow-y-auto px-4 no-scrollbar">
        <NavSection title="Main Operations">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={isActive('/home')} 
            onClick={() => handleNav('/home')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Members" 
            active={isActive('/members')}
            onClick={() => handleNav('/members')} 
            badge="1,240"
          />
          <SidebarItem 
            icon={Calendar} 
            label="Schedules" 
            active={isActive('/schedules')}
            onClick={() => handleNav('/schedules')}
          />
        </NavSection>

        <NavSection title="Financial Data">
          <SidebarItem 
            icon={CreditCard} 
            label="Billing" 
            active={isActive('/billing')}
            onClick={() => handleNav('/billing')}
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Revenue" 
            active={isActive('/revenue')}
            onClick={() => handleNav('/revenue')}
          />
        </NavSection>
      </div>

      {/* FOOTER */}
      <div className="mt-auto p-4 pt-6 border-t border-slate-100">
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={isActive('/settings')}
          onClick={() => handleNav('/settings')}
        />
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-[0.98] group"
        >
          <LogOut size={18} strokeWidth={2} className="text-slate-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;