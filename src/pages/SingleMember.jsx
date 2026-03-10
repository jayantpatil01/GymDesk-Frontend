import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, 
  ShieldAlert, Clock, User, AlertCircle, Loader2,
  Trash2, X, AlertTriangle
} from 'lucide-react';
import api from '../configs/Api';

const SingleMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal & Deleting States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMemberDetails();
  }, [id]);

  const fetchMemberDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/member/get-member/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setMember(response.data.member);
      }
    } catch (err) {
      console.error("Error fetching member:", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      const response = await api.delete(`/member/delete-member/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setShowDeleteModal(false);
        // Redirect back to directory
        navigate('/members');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete member");
      setIsDeleting(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-slate-500">
      <Loader2 className="animate-spin mr-2" /> ACCESSING RECORDS...
    </div>
  );

  if (!member) return <div className="p-10 text-center font-bold">Member not found.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 relative">
      
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} /> BACK TO DIRECTORY
        </button>

        <button 
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-[10px] font-black hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest border border-red-100 shadow-sm"
        >
          <Trash2 size={14} /> Remove Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-xl">
              {member.fullname.charAt(0)}
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{member.fullname}</h2>
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 mb-6">Active Member</p>
            
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">{member.mobile}</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700 truncate">{member.email}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-8 border-b border-slate-100 pb-4 uppercase tracking-tight">Full Profile Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <section>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <User size={14} /> Personal Information
                  </h4>
                  <div className="space-y-4">
                    <DetailItem label="Date of Birth" value={member.dob} icon={<Calendar size={14}/>}/>
                    <DetailItem label="Gender" value={member.gender} icon={<User size={14}/>}/>
                    <DetailItem label="Residential Address" value={member.address} icon={<MapPin size={14}/>}/>
                  </div>
                </section>

                <section>
                  <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldAlert size={14}/> Emergency Contact
                  </h4>
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-[1.5rem]">
                    <p className="text-xs font-black text-slate-900">{member.emergency_name}</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">{member.emergency_phone}</p>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Identity Document</h4>
                  <div className="aspect-[4/3] w-full bg-slate-100 rounded-[2rem] border-2 border-dashed border-slate-200 overflow-hidden shadow-inner">
                    {member.aadhar_image ? (
                      <img 
                        src={`http://localhost:4000/uploads/aadhar/${member.aadhar_image}`} 
                        alt="Aadhar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-center p-4">
                        <AlertCircle size={24} />
                        <p className="text-[10px] font-bold uppercase mt-2">No Image Uploaded</p>
                      </div>
                    )}
                  </div>
                </section>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Clock size={12}/> Registration Metadata
                  </p>
                  <p className="text-xs font-bold text-slate-700">Joined on {new Date(member.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CUSTOM DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Confirm Deletion</h3>
              <p className="text-sm text-slate-500 font-medium px-4">
                Are you sure you want to delete <span className="font-bold text-slate-900">{member.fullname}</span>? 
                This action will permanently remove their record and Aadhar image from the server.
              </p>
            </div>
            
            <div className="flex gap-3 p-6 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-4 rounded-2xl text-xs font-black text-slate-500 hover:bg-white border border-transparent hover:border-slate-200 transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {isDeleting ? "Deleting..." : "Delete Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 text-slate-300 p-2 bg-slate-50 rounded-lg">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value || 'Not Provided'}</p>
    </div>
  </div>
);

export default SingleMember;