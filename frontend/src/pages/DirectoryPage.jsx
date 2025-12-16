import { 
    Search, Filter, ChevronDown, Clock, MoreVertical, 
    Eye, Edit, Trash2 
} from 'lucide-react';

const StaffDirectory = ({ staffData, onDelete, onUpdate }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null); 
    const [editingStaff, setEditingStaff] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleMenuClick = (e, id) => { e.stopPropagation(); setOpenMenuId(openMenuId === id ? null : id); };
    const handleRowClick = (staff) => setSelectedStaff(staff);
    const handleEditClick = (staff) => { setEditingStaff(staff); setIsEditModalOpen(true); setOpenMenuId(null); };
    const handleSaveEdit = (updatedStaff) => { onUpdate(updatedStaff); setIsEditModalOpen(false); setEditingStaff(null); alert("Data berhasil diperbarui!"); };

    const filteredData = staffData.filter(staff => (filter === 'All' || staff.category === filter) && (staff.name.toLowerCase().includes(search.toLowerCase()) || staff.unit.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-end md:items-center">
                <div><h2 className="text-2xl font-bold dark:text-white">Direktori Pegawai</h2><p className="text-sm text-gray-500 dark:text-gray-400">Kelola data seluruh pegawai rumah sakit.</p></div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><input type="text" placeholder="Cari Nama / Unit..." className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:border-[#17B8A5]" value={search} onChange={(e) => setSearch(e.target.value)}/></div>
                    <div className="relative"><Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><select className="pl-10 pr-8 py-2 border rounded-lg appearance-none dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:border-[#17B8A5]" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="All">Semua Profesi</option>{Object.keys(JOB_CATEGORIES).map(k => JOB_CATEGORIES[k].map(c => <option key={c} value={c}>{c}</option>))}</select><ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} /></div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-visible border border-gray-200 dark:border-gray-700 min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 dark:text-gray-200"><tr><th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase w-32">ID Pegawai</th><th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nama & Profesi</th><th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Jabatan & Unit</th><th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Shift</th><th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-right">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 dark:text-gray-200">{filteredData.map((staff) => {
                            let avatarColor = JOB_CATEGORIES.MEDIS.includes(staff.category) ? 'bg-[#17B8A5]' : JOB_CATEGORIES.KEPERAWATAN.includes(staff.category) ? 'bg-blue-400' : 'bg-gray-400';
                            return (
                                <tr key={staff.id} onClick={() => handleRowClick(staff)} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                                    <td className="px-6 py-4 align-top"><span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{staff.employeeId}</span></td>
                                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${avatarColor}`}>{staff.name.substring(0,2).toUpperCase()}</div><div><p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{staff.name}</p><p className="text-xs text-gray-400">{staff.category}</p></div></div></td>
                                    <td className="px-6 py-4 align-middle"><p className="text-sm font-bold text-gray-700 dark:text-gray-300">{staff.role}</p><p className="text-xs text-gray-500 dark:text-gray-400">{staff.unit}</p></td>
                                    <td className="px-6 py-4 align-middle"><span className={`px-3 py-1 text-xs rounded-full font-bold flex w-fit items-center gap-2 ${staff.currentShift === 'Pagi' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}><Clock size={12}/>{staff.currentShift}</span></td>
                                    <td className="px-6 py-4 text-right relative align-middle">
                                        <button onClick={(e) => handleMenuClick(e, staff.id)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"><MoreVertical size={18} /></button>
                                        {openMenuId === staff.id && (<div className="absolute right-8 top-8 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-100 dark:border-gray-600 z-50 animate-fade-in origin-top-right overflow-hidden"><button onClick={(e) => { e.stopPropagation(); handleRowClick(staff); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 border-b border-gray-50 dark:border-gray-700"><Eye size={16} className="text-[#17B8A5]"/> Lihat Detail</button><button onClick={(e) => { e.stopPropagation(); handleEditClick(staff); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 border-b border-gray-50 dark:border-gray-700"><Edit size={16} className="text-blue-500"/> Edit Data</button><button onClick={(e) => { e.stopPropagation(); onDelete(staff.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 flex items-center gap-3"><Trash2 size={16}/> Hapus</button></div>)}
                                    </td>
                                </tr>
                            )
                        })}</tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={!!selectedStaff} onClose={() => setSelectedStaff(null)} title="Detail Data Pegawai" large={true}>
                {selectedStaff && (
                    <div className="p-4 space-y-6">
                        <div className="bg-[#17B8A5] text-white rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
                            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold text-white shadow-inner border-2 border-white/30 backdrop-blur-sm">{selectedStaff.name.substring(0,2).toUpperCase()}</div>
                            <div className="text-center md:text-left flex-1 space-y-2">
                                <h2 className="text-2xl font-bold">{selectedStaff.name}</h2>
                                <p className="font-medium opacity-90 text-lg">{selectedStaff.role}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2"><span className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono border border-white/30">ID: {selectedStaff.employeeId}</span><span className="bg-white text-[#17B8A5] px-3 py-1 rounded-full text-xs font-bold shadow-sm">{selectedStaff.category}</span><span className="bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1"><Clock size={12}/> {selectedStaff.currentShift}</span></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm space-y-4">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2"><User size={16}/> Biodata Diri</h4>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Jenis Kelamin</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.gender}</span></div>
                                    <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Tempat Lahir</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.birthPlace || '-'}</span></div>
                                    <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Email</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.email}</span></div>
                                    <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">No. HP</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.phone}</span></div>
                                    <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Alamat</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.address}</span></div>
                                </div>
                            </div>

                             <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm space-y-4">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2"><Briefcase size={16}/> Kepegawaian</h4>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Unit Kerja</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.unit}</span></div>
                                        <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Status</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.employeeType}</span></div>
                                        <div className="grid grid-cols-3 text-sm"><span className="text-gray-500 dark:text-gray-400">Bergabung</span> <span className="col-span-2 font-semibold dark:text-white">: {selectedStaff.joinDate}</span></div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm space-y-4">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2"><FileText size={16}/> Legalitas & Dokumen</h4>
                                    {selectedStaff.sipNumber && selectedStaff.sipNumber !== '-' ? (
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2"><div><p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase">Nomor SIP</p><p className="font-bold text-gray-800 dark:text-white">{selectedStaff.sipNumber}</p></div><div className="text-right"><p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase">Berlaku Hingga</p><p className="font-bold text-gray-800 dark:text-white">{selectedStaff.sipExpiry}</p></div></div>
                                            {selectedStaff.sipImage && (<div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-700"><p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold mb-2 flex items-center gap-1"><Eye size={10}/> Preview Dokumen</p><div className="w-full h-40 bg-white dark:bg-gray-700 rounded border border-yellow-300 dark:border-yellow-600 overflow-hidden"><img src={selectedStaff.sipImage} className="w-full h-full object-contain" alt="SIP Document"/></div></div>)}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-400 italic bg-gray-50 dark:bg-gray-800 p-4 rounded text-center">Tidak ada data legalitas yang tersimpan.</div>
                                    )}
                                </div>
                             </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700 gap-3"><button onClick={() => setSelectedStaff(null)} className="px-6 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium">Tutup</button><button onClick={() => {setSelectedStaff(null); handleEditClick(selectedStaff);}} className="px-6 py-2.5 rounded-lg bg-[#17B8A5] text-white hover:bg-[#0F8F80] transition font-bold shadow-md flex gap-2 items-center"><Edit size={16}/> Edit Data</button></div>
                    </div>
                )}
            </Modal>
            <EditStaffModal staff={editingStaff} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveEdit} />
        </div>
    );
};