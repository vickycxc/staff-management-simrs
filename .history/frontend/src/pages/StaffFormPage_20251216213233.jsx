import React, { useState } from 'react';
import { 
    UserPlus, ChevronDown, Briefcase, CheckCircle, Upload, X 
} from 'lucide-react';

// --- MOCK DATA (To make the form work independently) ---

const JOB_CATEGORIES = {
    MEDIS: ['Dokter Umum', 'Dokter Spesialis', 'Dokter Gigi'],
    KEPERAWATAN: ['Perawat', 'Bidan'],
    PENUNJANG: ['Radiologi', 'Laboratorium', 'Farmasi'],
    NON_MEDIS: ['Administrasi', 'IT', 'HRD', 'Keuangan']
};

const UNIT_MAPPING = {
    'Dokter Umum': ['IGD', 'Poli Umum', 'MCU'],
    'Dokter Spesialis': ['Poli Bedah', 'Poli Penyakit Dalam', 'Poli Anak'],
    'Perawat': ['Rawat Inap Lt.1', 'Rawat Inap Lt.2', 'ICU', 'IGD'],
    'Administrasi': ['Front Office', 'Back Office'],
    'IT': ['Server Room', 'Support'],
    // Add default fallbacks for others
    'default': ['Umum']
};

const REQUIRED_SIP_DOCS = ['Dokter Umum', 'Dokter Spesialis', 'Dokter Gigi', 'Perawat', 'Bidan', 'Radiologi', 'Farmasi'];

// --- MAIN COMPONENT ---

const StaffForm = ({ onAddStaff }) => {
    // Default fallback if onAddStaff isn't passed
    const handleAddStaff = onAddStaff || ((data) => console.log("Data Submitted:", data));

    const [formData, setFormData] = useState({ 
        employeeId: '', 
        name: '', 
        role: '', 
        unit: '', 
        category: 'Dokter Umum', 
        employeeType: 'Tetap', 
        sipNumber: '', 
        sipExpiry: '', 
        sipImage: null, 
        gender: 'Laki-laki', 
        birthPlace: '', 
        birthDate: '', 
        phone: '', 
        email: '', 
        address: '' 
    });

    const [availableUnits, setAvailableUnits] = useState(UNIT_MAPPING['Dokter Umum'] || []);
    const [sipImagePreview, setSipImagePreview] = useState(null);
    
    const handleChange = (e) => { 
        const { name, value } = e.target; 
        
        if (name === 'category') { 
            const newUnits = UNIT_MAPPING[value] || UNIT_MAPPING['default'] || []; 
            setAvailableUnits(newUnits); 
            setFormData(prev => ({ 
                ...prev, 
                [name]: value, 
                unit: newUnits[0] || '' 
            })); 
        } else { 
            setFormData(prev => ({ ...prev, [name]: value })); 
        } 
    };

    const handleFileChange = (e) => { 
        const file = e.target.files[0]; 
        if (file) { 
            const objectUrl = URL.createObjectURL(file); 
            setSipImagePreview(objectUrl); 
            setFormData(prev => ({ ...prev, sipImage: objectUrl })); 
        } 
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        handleAddStaff({ 
            ...formData, 
            id: Math.random(), 
            joinDate: new Date().toISOString().split('T')[0], 
            performance: [], 
            skpPoints: 0, 
            currentShift: 'Libur', 
            status: 'Active', 
            kpi: [], 
            behavior: [], 
            discipline: [], 
            training: [], 
            skp: { target: 0, realization: 0, grade: "-" } 
        }); 
        alert("Data Staf Berhasil Disimpan"); 
    };

    const isMedical = REQUIRED_SIP_DOCS.includes(formData.category);

    return (
        <div className="space-y-6 animate-fade-in p-6">
            <h2 className="text-2xl font-bold text-[#2C2C2C] dark:text-white">Input Data SDM Baru</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* COLUMN 1: IDENTITAS */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b dark:border-gray-700 pb-4">
                        <UserPlus size={20} className="text-[#17B8A5]" /> Identitas & Penempatan
                    </h3>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">ID Pegawai</label>
                            <input name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Nama Lengkap</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Jenis Kelamin</label>
                                <div className="relative mt-1">
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]">
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDown size={16}/></div>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">No. Telepon</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]" placeholder="08..."/>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]" placeholder="email@rs.com"/>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Kategori</label>
                                <div className="relative mt-1">
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]">
                                        <optgroup label="Medis">{JOB_CATEGORIES.MEDIS.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                                        <optgroup label="Keperawatan">{JOB_CATEGORIES.KEPERAWATAN.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                                        <optgroup label="Penunjang">{JOB_CATEGORIES.PENUNJANG.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                                        <optgroup label="Non-Medis">{JOB_CATEGORIES.NON_MEDIS.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDown size={16}/></div>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Unit</label>
                                <div className="relative mt-1">
                                    <select name="unit" value={formData.unit} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]">
                                        <option value="">-- Pilih Unit --</option>
                                        {availableUnits.map((u, i) => (<option key={i} value={u}>{u}</option>))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDown size={16}/></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Jabatan</label>
                                <input name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status Kepegawaian</label>
                                <div className="relative mt-1">
                                    <select name="employeeType" value={formData.employeeType} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]">
                                        <option value="Tetap">Pegawai Tetap</option>
                                        <option value="Kontrak">Kontrak (PKWT)</option>
                                        <option value="Mitra">Mitra (Dokter Tamu)</option>
                                        <option value="Residen">Residen (PPDS)</option>
                                        <option value="Magang">Magang (Internship)</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDown size={16}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: LEGALITAS */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b dark:border-gray-700 pb-4">
                        <Briefcase size={20} className="text-[#17B8A5]"/> Legalitas & Biodata
                    </h3>
                    
                    <div className="mb-5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Alamat Lengkap</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg h-32 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]" placeholder="Jl. ..."></textarea>
                    </div>

                    {!isMedical ? (
                        <div className="h-48 flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm p-6 text-center border-2 border-dashed border-gray-200 dark:border-gray-600">
                            <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-full mb-3">
                                <CheckCircle size={24} className="text-gray-400 dark:text-gray-300"/>
                            </div>
                            <p>Kategori <strong>{formData.category}</strong>.</p>
                            <p className="text-xs mt-1">Tidak memerlukan input data SIP.</p>
                        </div>
                    ) : (
                        <div className="space-y-5 animate-fade-in">
                            <div>
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Nomor SIP</label>
                                <input name="sipNumber" value={formData.sipNumber} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Masa Berlaku SIP</label>
                                <input type="date" name="sipExpiry" value={formData.sipExpiry} onChange={handleChange} className="w-full mt-1 px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">Upload Scan SIP</label>
                                {sipImagePreview ? (
                                    <div className="relative group">
                                        <img src={sipImagePreview} className="w-full h-32 object-cover rounded border dark:border-gray-600" alt="SIP Preview" />
                                        <button onClick={() => {setSipImagePreview(null); setFormData(prev => ({...prev, sipImage: null}))}} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X size={14}/></button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer relative">
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                                        <Upload className="mx-auto text-gray-400 mb-2" size={24}/>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Klik untuk upload file</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    <button onClick={handleSubmit} className="w-full mt-8 py-3 rounded-xl text-white font-bold bg-[#17B8A5] hover:bg-[#0F8F80] transition-colors shadow-lg shadow-[#17B8A5]/30">
                        Simpan Data Pegawai
                    </button>
                </div>
            </div>
        </div>
    );
};

// CRITICAL: This was missing in your original code
export default StaffForm;