import React, { useState, useEffect } from 'react';
import { 
    ChevronDown as ChevronDownIcon, Briefcase, FileText, Eye, Upload, Save, X 
} from 'lucide-react';
import Modal from './modal';
import { JOB_CATEGORIES, UNIT_MAPPING, REQUIRED_SIP_DOCS } from '../constants/data';

export const EditStaffModal = ({ staff, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(staff || {});
    const [availableUnits, setAvailableUnits] = useState([]);
    const [sipImagePreview, setSipImagePreview] = useState(null);

    useEffect(() => {
        if (staff) {
            setFormData({ ...staff });
            setAvailableUnits(UNIT_MAPPING[staff.category] || []);
            setSipImagePreview(staff.sipImage || null);
        }
    }, [staff]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const newUnits = UNIT_MAPPING[value] || [];
            setAvailableUnits(newUnits);
            setFormData(prev => ({ ...prev, [name]: value, unit: newUnits[0] || '' }));
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

    const handleRemoveImage = () => {
        setSipImagePreview(null);
        setFormData(prev => ({ ...prev, sipImage: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const isMedical = REQUIRED_SIP_DOCS.includes(formData.category);

    if (!isOpen || !staff) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Data: ${staff.name}`} large={true}>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <h4 className="text-sm font-bold text-[#17B8A5] uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2">Identitas & Kepegawaian</h4>
                        <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">ID Pegawai</label><input name="employeeId" value={formData.employeeId || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg font-mono bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" /></div>
                        <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nama Lengkap</label><input name="name" value={formData.name || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Kategori</label><div className="relative"><select name="category" value={formData.category || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"><optgroup label="Medis">{JOB_CATEGORIES.MEDIS.map(c => <option key={c} value={c}>{c}</option>)}</optgroup><optgroup label="Keperawatan">{JOB_CATEGORIES.KEPERAWATAN.map(c => <option key={c} value={c}>{c}</option>)}</optgroup><optgroup label="Penunjang">{JOB_CATEGORIES.PENUNJANG.map(c => <option key={c} value={c}>{c}</option>)}</optgroup><optgroup label="Non-Medis">{JOB_CATEGORIES.NON_MEDIS.map(c => <option key={c} value={c}>{c}</option>)}</optgroup></select><div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDownIcon/></div></div></div>
                            <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Unit Kerja</label><div className="relative"><select name="unit" value={formData.unit || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg appearance-none bg-yellow-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{availableUnits.map((u, i) => <option key={i} value={u}>{u}</option>)}</select><div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDownIcon/></div></div></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Jabatan</label><input name="role" value={formData.role || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" /></div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</label>
                                <div className="relative">
                                    <select name="employeeType" value={formData.employeeType || 'Tetap'} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <option value="Tetap">Pegawai Tetap</option>
                                        <option value="Kontrak">Kontrak (PKWT)</option>
                                        <option value="Mitra">Mitra (Dokter Tamu)</option>
                                        <option value="Residen">Residen (PPDS)</option>
                                        <option value="Magang">Magang (Internship)</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDownIcon/></div>
                                </div>
                            </div>
                        </div>
                         <div>
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Shift Saat Ini</label>
                            <div className="relative mt-1">
                                <select name="currentShift" value={formData.currentShift || 'Pagi'} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:border-[#17B8A5] outline-none">
                                    <option value="Pagi">Pagi (07:00 - 15:00)</option>
                                    <option value="Sore">Sore (14:00 - 21:00)</option>
                                    <option value="Malam">Malam (21:00 - 07:00)</option>
                                    <option value="Office Hour">Office Hour (08:00 - 16:00)</option>
                                    <option value="Libur">Libur / Off</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"><ChevronDownIcon/></div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <h4 className="text-sm font-bold text-[#17B8A5] uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2">Biodata & Legalitas</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email</label><input name="email" value={formData.email || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" /></div>
                            <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">No. Telepon</label><input name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" /></div>
                        </div>
                        <div><label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Alamat</label><textarea name="address" value={formData.address || ''} onChange={handleChange} className="w-full mt-1 px-4 py-2 border rounded-lg h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea></div>
                        {isMedical ? (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700 mt-4">
                                <div className="flex items-center gap-2 mb-3"><Briefcase size={18} className="text-yellow-600 dark:text-yellow-500"/><span className="font-bold text-yellow-800 dark:text-yellow-400 text-sm">Data SIP (Wajib)</span></div>
                                <div className="space-y-3">
                                    <div><label className="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase">Nomor SIP</label><input name="sipNumber" value={formData.sipNumber || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" /></div>
                                    <div><label className="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase">Masa Berlaku</label><input type="date" name="sipExpiry" value={formData.sipExpiry || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white" /></div>
                                    <div className="pt-2 border-t border-yellow-200 dark:border-yellow-700">
                                        <label className="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase block mb-2">Dokumen SIP</label>
                                        {sipImagePreview ? (
                                            <div className="relative mb-2 group w-full">
                                                <div className="w-full h-48 rounded-lg border-2 border-yellow-300 bg-white dark:bg-gray-700 overflow-hidden relative">
                                                    <img src={sipImagePreview} alt="Preview SIP" className="w-full h-full object-contain" />
                                                </div>
                                                <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10" title="Hapus Gambar"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-yellow-300 dark:border-yellow-600 rounded-lg p-6 text-center bg-white dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-gray-600 transition cursor-pointer relative group">
                                                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                <div className="flex flex-col items-center justify-center text-yellow-600 dark:text-yellow-500 group-hover:text-yellow-700">
                                                    <Upload size={32} className="mb-2"/>
                                                    <span className="text-sm font-medium">Klik untuk Upload Dokumen</span>
                                                    <span className="text-xs opacity-70">JPG, PNG (Maks. 2MB)</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center text-gray-400 text-sm italic">Posisi ini tidak memerlukan input SIP.</div>}
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100 dark:border-gray-700"><button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition">Batal</button><button type="submit" className="px-5 py-2.5 rounded-lg bg-[#17B8A5] text-white hover:bg-[#0F8F80] font-bold shadow-md flex items-center gap-2 transition"><Save size={18}/> Simpan Perubahan</button></div>
            </form>
        </Modal>
    );
};