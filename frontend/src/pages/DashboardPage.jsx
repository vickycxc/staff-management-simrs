import { 
    AlertTriangle, ChevronRight, Stethoscope, Users, Activity, 
    Shield, Sun, Cloud, Moon, CheckCircle 
} from 'lucide-react';

const Dashboard = ({ staffData }) => {
    const [modalData, setModalData] = useState({ isOpen: false, title: '', list: [] });
    const [showSipModal, setShowSipModal] = useState(false);

    const getSipWarnings = () => {
        const today = new Date();
        return staffData.map(staff => {
            if (!staff.sipExpiry || staff.sipExpiry === '-') return null;
            const sipDate = new Date(staff.sipExpiry);
            const diffTime = sipDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let status = '';
            if (diffDays <= 30) status = 'red';
            else if (diffDays <= 90) status = 'orange';
            else if (diffDays <= 180) status = 'yellow';
            if (!status) return null;
            return { ...staff, warningStatus: status, daysLeft: diffDays };
        }).filter(Boolean).sort((a,b) => a.daysLeft - b.daysLeft);
    };

    const warningList = getSipWarnings();
    const getStaffByCategory = (cats) => staffData.filter(s => cats.includes(s.category));
    const getStaffByShift = (shiftName) => {
        if (shiftName === 'Pagi') return staffData.filter(s => s.currentShift === 'Pagi' || s.currentShift === 'Office Hour');
        return staffData.filter(s => s.currentShift === shiftName);
    };
    const openListModal = (title, dataList) => { setModalData({ isOpen: true, title, list: dataList }); };

    return (
        <div className="space-y-8 animate-fade-in">
            <div><h2 className="text-2xl font-bold text-[#2C2C2C] dark:text-white">Dashboard Operasional SDM</h2><p className="text-gray-500 dark:text-gray-400 text-sm">Ringkasan data pegawai dan status operasional hari ini.</p></div>

            {warningList.length > 0 && (
                <div onClick={() => setShowSipModal(true)} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shadow-sm animate-fade-in">
                    <div className="flex items-center gap-3"><div className="p-2 bg-red-100 dark:bg-red-800 rounded-full text-red-600 dark:text-red-200 animate-pulse"><AlertTriangle size={24} /></div><div><h3 className="font-bold text-red-800 dark:text-red-200 text-lg">Peringatan: {warningList.length} SIP Pegawai Perlu Perhatian</h3><p className="text-red-600 dark:text-red-300 text-sm">Klik di sini untuk melihat daftar pegawai dengan SIP yang akan segera berakhir.</p></div></div>
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-200 font-bold text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-red-200 dark:border-red-700">Lihat Detail <ChevronRight size={16}/></div>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <WidgetCard title="Dokter" count={getStaffByCategory(JOB_CATEGORIES.MEDIS).length} icon={Stethoscope} colorClass="text-[#17B8A5]" borderColorClass="border-[#17B8A5]" onClick={() => openListModal('Daftar Dokter', getStaffByCategory(JOB_CATEGORIES.MEDIS))} />
                <WidgetCard title="Perawat & Bidan" count={getStaffByCategory(JOB_CATEGORIES.KEPERAWATAN).length} icon={Users} colorClass="text-pink-500" borderColorClass="border-pink-500" onClick={() => openListModal('Daftar Perawat & Bidan', getStaffByCategory(JOB_CATEGORIES.KEPERAWATAN))} />
                <WidgetCard title="Penunjang Medis" count={getStaffByCategory(JOB_CATEGORIES.PENUNJANG).length} icon={Activity} colorClass="text-purple-500" borderColorClass="border-purple-500" onClick={() => openListModal('Daftar Penunjang Medis', getStaffByCategory(JOB_CATEGORIES.PENUNJANG))} />
                <WidgetCard title="Non-Medis" count={getStaffByCategory(JOB_CATEGORIES.NON_MEDIS).length} icon={Shield} colorClass="text-gray-600" borderColorClass="border-gray-600" onClick={() => openListModal('Daftar Non-Medis', getStaffByCategory(JOB_CATEGORIES.NON_MEDIS))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => openListModal('Daftar Pegawai Shift Pagi', getStaffByShift('Pagi'))} className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-all">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-full text-blue-500"><Sun size={20}/></div>
                    <div><p className="text-xs text-blue-500 font-bold uppercase">Shift Pagi</p><p className="text-sm font-bold text-gray-700 dark:text-gray-200">07.00 - 15.00</p></div>
                </div>
                <div onClick={() => openListModal('Daftar Pegawai Shift Sore', getStaffByShift('Sore'))} className="bg-orange-50 dark:bg-gray-800 border border-orange-100 dark:border-gray-700 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-md hover:bg-orange-100 dark:hover:bg-gray-700 transition-all">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-full text-orange-500"><Cloud size={20}/></div>
                    <div><p className="text-xs text-orange-500 font-bold uppercase">Shift Sore</p><p className="text-sm font-bold text-gray-700 dark:text-gray-200">15.00 - 23.00</p></div>
                </div>
                <div onClick={() => openListModal('Daftar Pegawai Shift Malam', getStaffByShift('Malam'))} className="bg-indigo-50 dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-md hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-full text-indigo-600"><Moon size={20}/></div>
                    <div><p className="text-xs text-indigo-600 font-bold uppercase">Shift Malam</p><p className="text-sm font-bold text-gray-700 dark:text-gray-200">23.00 - 07.00</p></div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2"><AlertTriangle className="text-yellow-600" size={20} /> Monitoring Masa Berlaku SIP</h3>
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-bold">{warningList.length} Perlu Perhatian</span>
                </div>
                <div className="p-5">
                    {warningList.length === 0 ? (
                        <div className="text-center py-10 flex flex-col items-center justify-center text-gray-400"><CheckCircle size={48} className="mb-2 text-green-500 opacity-50"/><p>Semua SIP Pegawai Aman ({'>'} 6 Bulan).</p></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {warningList.map(staff => {
                                let bgColor = staff.warningStatus === 'red' ? 'bg-red-50 dark:bg-red-900/20' : staff.warningStatus === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20';
                                let borderColor = staff.warningStatus === 'red' ? 'border-red-200' : staff.warningStatus === 'orange' ? 'border-orange-200' : 'border-yellow-200';
                                let textColor = staff.warningStatus === 'red' ? 'text-red-700' : staff.warningStatus === 'orange' ? 'text-orange-700' : 'text-yellow-700';
                                let icon = staff.warningStatus === 'red' ? '🚨' : staff.warningStatus === 'orange' ? '⚠️' : '⚡';
                                let label = staff.warningStatus === 'red' ? 'CRITICAL' : staff.warningStatus === 'orange' ? 'WARNING' : 'ATTENTION';

                                return (
                                    <div key={staff.id} className={`flex items-center justify-between p-4 border rounded-lg shadow-sm transition-transform hover:scale-[1.01] ${bgColor} ${borderColor}`}>
                                        <div className="flex items-center gap-4"><div className="text-3xl">{icon}</div><div><p className="font-bold text-gray-800 dark:text-white">{staff.name}</p><div className="flex items-center gap-2 mt-1"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 border ${borderColor} ${textColor}`}>{label}</span><span className="text-xs text-gray-500 dark:text-gray-400">Exp: {staff.sipExpiry}</span></div></div></div>
                                        <button onClick={() => openListModal('Detail Pegawai', [staff])} className="text-xs font-semibold underline text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">Lihat</button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={modalData.isOpen} onClose={() => setModalData({...modalData, isOpen: false})} title={modalData.title}>
                <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700 font-bold dark:text-gray-200"><tr><th className="p-4">Nama</th><th className="p-4">Unit</th><th className="p-4">Jabatan</th><th className="p-4">Status</th></tr></thead><tbody className="dark:text-gray-200">{modalData.list.map(s => <tr key={s.id} className="border-b dark:border-gray-700"><td className="p-4 font-bold">{s.name}</td><td className="p-4">{s.unit}</td><td className="p-4">{s.role}</td><td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Aktif</span></td></tr>)}</tbody></table></div>
            </Modal>

            <Modal isOpen={showSipModal} onClose={() => setShowSipModal(false)} title="Daftar Peringatan SIP Expired" large={true}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">{warningList.map(staff => (<div key={staff.id} className={`p-4 border rounded-lg shadow-sm flex items-center justify-between ${staff.warningStatus === 'red' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800' : staff.warningStatus === 'orange' ? 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800' : 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800'}`}><div><p className="font-bold text-gray-800 dark:text-gray-200">{staff.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{staff.unit}</p><div className="flex items-center gap-2 mt-2"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">{staff.warningStatus === 'red' ? 'CRITICAL' : 'WARNING'}</span><span className="text-xs font-bold text-gray-600 dark:text-gray-400">Exp: {staff.sipExpiry}</span></div></div></div>))}</div>
            </Modal>
        </div>
    );
};