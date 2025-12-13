// src/pages/PerformanceModule.jsx
import React, { useState } from 'react';
import { 
    Search, Target, UserCheck, GraduationCap, 
    FileBarChart, Award, Users, FileText, CheckCircle 
} from 'lucide-react';

const PerformancePage = ({ staffData }) => {
    // State initialization
    const [selectedId, setSelectedId] = useState(staffData[0]?.id);
    const [activeTab, setActiveTab] = useState('kpi'); // 'kpi', 'behavior', 'training'
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic
    const filteredStaff = staffData.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.unit.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Find selected staff
    const staff = staffData.find(s => s.id === parseInt(selectedId));

    const tabs = [
        { id: 'kpi', label: 'KPI & IKU', icon: Target },
        { id: 'behavior', label: 'Perilaku & Disiplin', icon: UserCheck },
        { id: 'training', label: 'Diklat & SKP', icon: GraduationCap },
    ];

    return (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out_forwards]">
            <h2 className="text-2xl font-bold text-[#2C2C2C]">Evaluasi Kinerja (KPI & OPPE)</h2>
            <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
                
                {/* LEFT SIDEBAR: STAFF LIST */}
                <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" placeholder="Cari Pegawai..." 
                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#17B8A5]"
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {filteredStaff.map(s => (
                            <button 
                                key={s.id} onClick={() => setSelectedId(s.id)}
                                className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${selectedId === s.id ? 'bg-[#17B8A5] text-white shadow-md transform scale-[1.02]' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                <div className="font-bold">{s.name}</div>
                                <div className={`text-xs ${selectedId === s.id ? 'text-white/80' : 'text-gray-500'}`}>{s.unit}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT */}
                <div className="w-full md:w-3/4 flex flex-col h-full">
                    {staff ? (
                        <React.Fragment>
                            {/* Staff Header */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{staff.name}</h3>
                                    <p className="text-gray-500 text-sm">{staff.role} - {staff.unit}</p>
                                    <p className="text-xs text-gray-400 font-mono mt-1">{staff.employeeId}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase">Skor Kinerja Total</p>
                                    <div className="text-4xl font-bold text-[#17B8A5]">{staff.performance[staff.performance.length-1] || '-'}</div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
                                <div className="flex border-b border-gray-100">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                                                activeTab === tab.id 
                                                ? 'border-b-2 border-[#17B8A5] text-[#17B8A5] bg-[#F0FDFA]' 
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <tab.icon size={18}/> {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
                                    
                                    {/* TAB CONTENT: KPI & IKU */}
                                    {activeTab === 'kpi' && (
                                        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out_forwards]">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-lg font-bold text-gray-800">Indikator Kinerja Utama (IKU)</h4>
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Periode: 2024</span>
                                            </div>
                                            
                                            {staff.kpi && staff.kpi.length > 0 ? (
                                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                    <table className="w-full text-sm text-left">
                                                        <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                                                            <tr>
                                                                <th className="p-4">Indikator Kinerja</th>
                                                                <th className="p-4">Target</th>
                                                                <th className="p-4">Realisasi</th>
                                                                <th className="p-4 text-right">Capaian (%)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100">
                                                            {staff.kpi.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="p-4 font-medium text-gray-700">{item.indicator}</td>
                                                                    <td className="p-4 text-gray-500">{item.target}</td>
                                                                    <td className="p-4 text-gray-800 font-semibold">{item.actual}</td>
                                                                    <td className="p-4 text-right">
                                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                                            item.score >= 90 ? 'bg-green-100 text-green-700' : 
                                                                            item.score >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                                        }`}>
                                                                            {item.score}%
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <div className="text-center py-10 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300">
                                                    Belum ada data KPI yang diinput.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* TAB CONTENT: PERILAKU & DISIPLIN */}
                                    {activeTab === 'behavior' && (
                                        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out_forwards]">
                                            {/* Perilaku */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <UserCheck size={20} className="text-[#17B8A5]"/> Penilaian Perilaku (360 Degree)
                                                </h4>
                                                {staff.behavior && staff.behavior.length > 0 ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {staff.behavior.map((b, idx) => (
                                                            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-bold text-gray-700">{b.aspect}</span>
                                                                    <span className="font-bold text-[#17B8A5]">{b.score}/100</span>
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                                                    <div className="bg-[#17B8A5] h-2 rounded-full" style={{ width: `${b.score}%` }}></div>
                                                                </div>
                                                                <p className="text-xs text-gray-500 italic">"{b.note}"</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400 italic">Data perilaku belum tersedia.</p>
                                                )}
                                            </div>

                                            {/* Disiplin */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <FileText size={20} className="text-red-500"/> Catatan Disiplin & Pelanggaran
                                                </h4>
                                                {staff.discipline && staff.discipline.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {staff.discipline.map((d, idx) => (
                                                            <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex justify-between items-start">
                                                                <div>
                                                                    <p className="font-bold text-red-700">{d.type}</p>
                                                                    <p className="text-sm text-red-600 mt-1">{d.description}</p>
                                                                </div>
                                                                <span className="text-xs font-semibold text-red-400">{d.date}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-700 flex items-center gap-3">
                                                        <CheckCircle size={20}/>
                                                        <span>Tidak ada catatan pelanggaran disiplin. Pegawai Teladan.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB CONTENT: DIKLAT & SKP */}
                                    {activeTab === 'training' && (
                                        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out_forwards]">
                                            {/* SKP */}
                                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <FileBarChart size={20} className="text-[#17B8A5]"/> Sasaran Kinerja Pegawai (SKP)
                                                </h4>
                                                <div className="grid grid-cols-3 gap-6 text-center">
                                                    <div className="p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-xs text-gray-500 uppercase">Target Kredit</p>
                                                        <p className="text-2xl font-bold text-gray-800">{staff.skp?.target || 0}</p>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-xs text-gray-500 uppercase">Realisasi</p>
                                                        <p className="text-2xl font-bold text-[#17B8A5]">{staff.skp?.realization || 0}</p>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-xs text-gray-500 uppercase">Predikat</p>
                                                        <p className="text-2xl font-bold text-blue-600">{staff.skp?.grade || '-'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Diklat */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <Award size={20} className="text-orange-500"/> Riwayat Pendidikan & Pelatihan (Diklat)
                                                </h4>
                                                {staff.training && staff.training.length > 0 ? (
                                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                        <table className="w-full text-sm text-left">
                                                            <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                                                                <tr>
                                                                    <th className="p-4">Nama Kegiatan</th>
                                                                    <th className="p-4">Tanggal</th>
                                                                    <th className="p-4">Jenis</th>
                                                                    <th className="p-4">Durasi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-100">
                                                                {staff.training.map((t, idx) => (
                                                                    <tr key={idx}>
                                                                        <td className="p-4 font-bold text-gray-700">{t.name}</td>
                                                                        <td className="p-4 text-gray-500">{t.date}</td>
                                                                        <td className="p-4">
                                                                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs border border-blue-100">{t.type}</span>
                                                                        </td>
                                                                        <td className="p-4 text-gray-500">{t.duration}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400 italic bg-white p-4 rounded border border-dashed text-center">Belum ada riwayat diklat tahun ini.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300 m-4">
                            <Users size={48} className="mb-4 opacity-50"/>
                            <p>Pilih pegawai dari daftar di sebelah kiri untuk melihat detail kinerja.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerformancePage;