import React, { useState, useEffect } from 'react';
import { 
  Search, UserPlus, Mail, Phone, 
  Filter, Loader2, AlertCircle, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../configs/Api';

const Member = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/member/get-members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setMembers(response.data.members);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic for search
  const filteredMembers = members.filter(m => 
    m.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mobile.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-slate-500 gap-3">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-xs font-black uppercase tracking-widest">Loading Directory...</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-500 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Directory</h2>
          <p className="text-slate-500 text-sm font-medium">Manage your gym's active member base</p>
        </div>
        <button 
          onClick={() => navigate('/add-member')}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          <UserPlus size={16} /> ADD NEW MEMBER
        </button>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-slate-900 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">
          <Filter size={14} /> Filter List
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-700">
          <AlertCircle />
          <p className="font-bold text-sm">{error}</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Basic Info</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Details</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-md">
                          {member.fullname.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{member.fullname}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{member.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
                          <Phone size={12} className="text-slate-300"/> {member.mobile}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                          <Mail size={12} className="text-slate-300"/> {member.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        member.is_active 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => navigate(`/members/${member.id}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-wider"
                      >
                        <Eye size={14} /> View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-bold text-sm">No members found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Member;