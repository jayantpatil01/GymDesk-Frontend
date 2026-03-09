import React, { useState } from 'react';
import { Mail, Lock, Dumbbell, Eye, EyeOff, ChevronRight, Shield, Headset } from 'lucide-react';

const InputField = ({ label, type, icon: Icon, placeholder, value, onChange, togglePassword, showPassword }) => (
  <div className="space-y-1 sm:space-y-2">
    <label className="text-[12px] sm:text-[13px] font-bold text-slate-700 ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
        <Icon size={16} className="sm:w-[18px]" strokeWidth={2} />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl focus:border-black focus:ring-4 focus:ring-slate-100 transition-all outline-none text-sm font-medium text-slate-800 placeholder:text-slate-400"
        placeholder={placeholder}
        required
      />
      {togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-black"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    // h-[100dvh] is the modern way to handle mobile browser toolbars
    <div className="h-[100dvh] w-full bg-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT SECTION: BRANDING (Flexible height/width) */}
      <div className="relative h-[35%] lg:h-full lg:w-[45%] xl:w-[40%] flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-16 overflow-hidden bg-slate-900 shrink-0">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Interior" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 lg:mb-12">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Dumbbell className="text-black w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg sm:text-2xl font-black tracking-tighter italic text-white uppercase">GYMDESK</span>
          </div>

          <div className="space-y-1 sm:space-y-2 lg:space-y-4">
            <h1 className="text-2xl sm:text-4xl xl:text-6xl font-light leading-tight text-white tracking-tight">
              Elevate your <br />
              <span className="font-bold">Fitness Empire</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-slate-300 font-medium opacity-90">
              to the next level.
            </p>
          </div>
        </div>

        {/* Support Badges - Adjusted for smaller height profiles */}
        <div className="relative z-10 hidden sm:block">
          <div className="space-y-3 lg:space-y-5">
            <div className="flex items-center gap-3 text-slate-200">
              <Shield size={16} className="text-emerald-400 lg:w-[18px]" />
              <p className="text-[11px] lg:text-sm font-semibold tracking-wide uppercase">Enterprise Grade Security</p>
            </div>
            <div className="flex items-center gap-3 text-slate-300 border-t border-white/10 pt-3 lg:pt-4">
              <Headset size={16} className="text-blue-400 lg:w-[18px]" />
              <p className="text-[11px] lg:text-sm font-medium italic">Dedicated 24/7 Support Line</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: LOGIN FORM (Flexible Centering) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 xl:p-20 bg-slate-50/50 relative overflow-hidden">
        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-slate-200/40 rounded-bl-full blur-2xl opacity-50"></div>
        
        {/* Form Container - Constrained for Mobile/Small tablets to ensure viewport fit */}
        <div className="w-full max-w-md bg-white p-6 sm:p-10 lg:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 relative z-10">
          <div className="mb-6 lg:mb-10 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Enter your admin credentials</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 lg:space-y-6">
            <InputField 
              label="Work Email"
              type="email"
              icon={Mail}
              placeholder="admin@gymdesk.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField 
              label="Secure Password"
              type={showPassword ? "text" : "password"}
              icon={Lock}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              togglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-black focus:ring-black accent-black" />
                <span className="ml-2 text-[12px] sm:text-sm font-semibold text-slate-500 group-hover:text-black transition-colors">Remember device</span>
              </label>
              <button type="button" className="text-[12px] sm:text-sm font-bold text-black hover:underline">
                Forgot?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-slate-800 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Access Admin Suite
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Fixed Footer within card */}
          <div className="mt-6 lg:mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] sm:text-sm text-slate-400 font-medium">
              © 2026 GymDesk ERP. <span className="text-black font-bold cursor-pointer hover:underline">Support Portal</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;