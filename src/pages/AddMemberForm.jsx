import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Phone, Mail, MapPin, 
  Calendar, ShieldAlert, ArrowLeft, 
  CheckCircle2, Upload, X, Info, AlertCircle, Loader2,
  CheckCircle
} from 'lucide-react';
import api from '../configs/Api';

const AddMemberForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // New state for inline messages
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', dob: '',
    gender: 'male', address: '', emergencyName: '', emergencyPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;
    if (name === "fullName" || name === "emergencyName") {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    }
    if (name === "mobile" || name === "emergencyPhone") {
      filteredValue = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [name]: filteredValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    if (status.message) setStatus({ type: '', message: '' }); // Clear status on type
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = null;
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMsg = "Invalid email format";
    }
    if ((name === "mobile" || name === "emergencyPhone") && value && value.length !== 10) {
      errorMsg = "Must be 10 digits";
    }
    if (name === "fullName" && value && value.length < 3) {
      errorMsg = "Name is too short";
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setErrors(prev => ({ ...prev, file: null }));
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // 1. Validation logic (Keep your existing validation here)
    const requiredFields = ['fullName', 'email', 'mobile', 'dob', 'address', 'emergencyName', 'emergencyPhone'];
    let finalErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) finalErrors[field] = "Required";
    });
    if (!selectedFile) finalErrors.file = "Required";

    if (Object.keys(finalErrors).length > 0 || Object.values(errors).some(v => v !== null)) {
      setErrors(prev => ({ ...prev, ...finalErrors }));
      setStatus({ type: 'error', message: 'Please fix the highlighted errors before saving.' });
      return;
    }

    // 2. Prepare Data
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('aadharImage', selectedFile);

    setLoading(true);
    try {
      // 3. API Call with Auth Header
      const response = await api.post('/member/create', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Sending the token as requested
        },
      });

      if (response.data.success) {
        setStatus({ type: 'success', message: 'Member saved successfully! Redirecting...' });
        setTimeout(() => navigate('/members'), 2000);
      }
    } catch (error) {
      const serverMsg = error.response?.data?.message || "Server error. Please try again.";
      setStatus({ type: 'error', message: serverMsg });
      
      // If token is expired or invalid, you might want to redirect to login
      if (error.response?.status === 401) {
        setStatus({ type: 'error', message: 'Session expired. Please login again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button disabled={loading} onClick={() => navigate(-1)} className="p-2.5 hover:bg-white rounded-xl text-slate-500 border border-slate-200 shadow-sm transition-all"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-black text-slate-900 leading-none tracking-tight">Add New Member</h2>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-slate-800 disabled:opacity-70 transition-all shadow-xl shadow-slate-200"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
          {loading ? 'SAVING...' : 'SAVE MEMBER'}
        </button>
      </div>

      {/* INLINE STATUS MESSAGE */}
      {status.message && (
        <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
          status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-bold">{status.message}</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-[1.5rem] p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.fullName ? 'text-red-400' : 'text-slate-300'}`} size={18} />
              <input 
                disabled={loading} type="text" name="fullName" value={formData.fullName} 
                onChange={handleInputChange} onBlur={handleBlur} placeholder="Rahul Sharma" 
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border ${errors.fullName ? 'border-red-400' : 'border-slate-200'} rounded-2xl text-sm outline-none focus:border-slate-900 transition-all`} 
              />
            </div>
            {errors.fullName && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-400' : 'text-slate-300'}`} size={18} />
              <input 
                disabled={loading} type="email" name="email" value={formData.email} 
                onChange={handleInputChange} onBlur={handleBlur} placeholder="rahul@gym.com" 
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-2xl text-sm outline-none focus:border-slate-900 transition-all`} 
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile</label>
            <div className="relative">
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.mobile ? 'text-red-400' : 'text-slate-300'}`} size={18} />
              <input 
                disabled={loading} type="text" name="mobile" value={formData.mobile} 
                onChange={handleInputChange} onBlur={handleBlur} placeholder="98765 43210" 
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border ${errors.mobile ? 'border-red-400' : 'border-slate-200'} rounded-2xl text-sm outline-none focus:border-slate-900 transition-all`} 
              />
            </div>
            {errors.mobile && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.mobile}</p>}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
            <input 
              disabled={loading} type="date" name="dob" value={formData.dob} onChange={handleInputChange}
              className={`w-full px-4 py-3.5 bg-slate-50/50 border ${errors.dob ? 'border-red-400' : 'border-slate-200'} rounded-2xl text-sm outline-none focus:border-slate-900 transition-all shadow-sm`} 
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl h-[52px]">
              {['male', 'female', 'other'].map((g) => (
                <button 
                  disabled={loading} key={g} type="button" onClick={() => setFormData(prev => ({...prev, gender: g}))} 
                  className={`flex-1 text-[10px] font-black uppercase rounded-xl transition-all ${formData.gender === g ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-500'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Proof Upload */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Aadhar Card</label>
            <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
            <button 
              disabled={loading} type="button" onClick={() => fileInputRef.current.click()} 
              className={`w-full h-[52px] border-2 border-dashed ${errors.file ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50/50'} rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all text-slate-400`}
            >
              {selectedFile ? <span className="text-emerald-600 font-bold text-[10px] truncate px-4">{selectedFile.name}</span> : <><Upload size={18} /><span className="text-[10px] font-black uppercase tracking-wider">Select Image</span></>}
            </button>
          </div>

          {/* Address */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Residential Address</label>
            <textarea 
              disabled={loading} rows="1" name="address" value={formData.address} onChange={handleInputChange}
              placeholder="Full address details..." 
              className={`w-full px-4 py-3.5 bg-slate-50/50 border ${errors.address ? 'border-red-400' : 'border-slate-200'} rounded-2xl text-sm outline-none focus:border-slate-900 transition-all resize-none shadow-sm`} 
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1.5">
             <label className="text-[11px] font-black text-blue-500 uppercase tracking-widest ml-1">Emergency Contact</label>
             <div className="flex gap-2">
                <input 
                  disabled={loading} type="text" name="emergencyName" value={formData.emergencyName} 
                  onChange={handleInputChange} onBlur={handleBlur} placeholder="Name" 
                  className={`w-1/2 px-4 py-3.5 bg-rose-50/20 border ${errors.emergencyName ? 'border-red-400' : 'border-rose-100'} rounded-2xl text-sm outline-none focus:border-rose-400`} 
                />
                <input 
                  disabled={loading} type="text" name="emergencyPhone" value={formData.emergencyPhone} 
                  onChange={handleInputChange} onBlur={handleBlur} placeholder="Phone" 
                  className={`w-1/2 px-4 py-3.5 bg-rose-50/20 border ${errors.emergencyPhone ? 'border-red-400' : 'border-rose-100'} rounded-2xl text-sm outline-none focus:border-rose-400`} 
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;