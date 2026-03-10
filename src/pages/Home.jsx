import React from 'react';
import {
  Users, UserPlus, TrendingUp,
  IndianRupee, BellRing, Download,
  Plus, Calendar, ArrowUpRight,
  Search, Filter, ChevronRight
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700">

      {/* 1. TOP GLOBAL SEARCH & ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search members, transactions, or plans..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all">
            <Filter size={18} />
          </button>
          <button
            onClick={() => navigate('/add-member')}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span>New Admission</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* LEFT COLUMN: Main Operations (8/12) */}
        <div className="xl:col-span-8 space-y-6">

          {/* STATS STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'New This Month', val: '45', color: 'blue', icon: UserPlus },
              { label: 'Active Members', val: '842', color: 'indigo', icon: Users },
              { label: 'Growth Rate', val: '+12.5%', color: 'emerald', icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RECENT TRANSACTIONS TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Recent Transactions</h3>
              <button className="text-xs font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-lg">History</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                  <tr>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "Rahul Sharma", mode: "UPI (PhonePe)", amt: "2,500" },
                    { name: "Amit Patel", mode: "Cash", amt: "1,200" },
                    { name: "Priya Das", mode: "UPI (GPay)", amt: "5,000" },
                  ].map((pay, i) => (
                    <tr key={i} className="text-sm hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{pay.name}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{pay.mode}</td>
                      <td className="px-6 py-4 font-black text-slate-900">₹{pay.amt}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                          <Download size={14} className="text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXPIRY SECTION */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Urgent Expirations</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Vikram Singh", plan: "3 Months Gold", date: "12 Mar", phone: "919876543210" },
                { name: "Anjali Gupta", plan: "Annual Elite", date: "15 Mar", phone: "919988776655" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{row.name}</p>
                    <p className="text-[10px] text-rose-500 font-bold uppercase mt-1">Expires: {row.date}</p>
                  </div>
                  <a
                    href={`https://wa.me/${row.phone}`}
                    className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-lg shadow-green-100 hover:scale-110 transition-transform"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Financial & Summary (4/12) */}
        <div className="xl:col-span-4 space-y-6">

          {/* COLLECTION CARD */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{currentMonth} Collection</p>
              <h2 className="text-4xl font-black mb-6 flex items-baseline gap-1">
                <span className="text-xl font-normal text-slate-500">₹</span>3,42,000
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-t border-white/10">
                  <span className="text-xs text-slate-400">GST Collected (18%)</span>
                  <span className="text-sm font-bold text-emerald-400">₹61,560</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-white/10">
                  <span className="text-xs text-slate-400">Pending Dues</span>
                  <span className="text-sm font-bold text-rose-400">₹18,200</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-white text-slate-900 py-3 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                <Download size={14} /> Download GST Report
              </button>
            </div>

            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 blur-[60px]" />
          </div>

          {/* QUICK LINKS / STATUS */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Shortcuts</h4>
            <div className="space-y-2">
              {[
                { label: 'View All Members', count: '842', color: 'bg-slate-100' },
                { label: 'Incomplete Profiles', count: '12', color: 'bg-amber-50 text-amber-600' },
                { label: 'Pending Renewals', count: '28', color: 'bg-rose-50 text-rose-600' },
              ].map((link, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all text-left group">
                  <span className="text-xs font-bold text-slate-700">{link.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${link.color}`}>{link.count}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;