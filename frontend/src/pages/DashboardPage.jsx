// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Users, Activity, Briefcase, Clock, ChevronRight, Sun, Cloud, Moon, CheckCircle } from 'lucide-react';
import { JOB_CATEGORIES } from '../constants/data';
import Modal from '../components/modal';

const DashboardPage = ({ staffData }) => {
    const [modalData, setModalData] = useState({ isOpen: false, title: '', list: [] });

    // ... (Masukkan logika getSipWarnings, getStaffByGroup, getStaffOnDuty, getStaffByShift di sini dari kode sebelumnya) ...
    // Note: Agar singkat, saya asumsikan fungsi helpernya ada di sini.
    const getStaffByGroup = (groups) => staffData.filter(s => groups.includes(s.category));
    const getStaffOnDuty = () => staffData.filter(s => s.currentShift === 'Pagi' || s.currentShift === 'Office Hour');
    const getStaffByShift = (shiftName) => {
         if (shiftName === 'Pagi') return staffData.filter(s => s.currentShift === 'Pagi' || s.currentShift === 'Office Hour');
         return staffData.filter(s => s.currentShift === shiftName);
    };
    const openListModal = (title, dataList) => setModalData({ isOpen: true, title, list: dataList });

    // Widget Component internal
    const WidgetCard = ({ title, count, icon: Icon, colorClass, borderColorClass, onClick }) => (
        <div onClick={onClick} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${borderColorClass} cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2 group-hover:text-[#17B8A5] transition-colors">{count}</h3>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${colorClass} group-hover:bg-white transition-colors`}><Icon size={24} /></div>
            </div>
            <p className={`text-xs mt-4 font-semibold flex items-center gap-1 ${colorClass.replace('text-', 'text-opacity-80 text-')}`}>Lihat Daftar <ChevronRight size={12}/></p>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <WidgetCard title="Medis & Perawat" count={getStaffByGroup([...JOB_CATEGORIES.MEDIS, ...JOB_CATEGORIES.KEPERAWATAN]).length} icon={Users} colorClass="text-[#17B8A5]" borderColorClass="border-[#17B8A5]" onClick={() => openListModal('Medis & Perawat', getStaffByGroup([...JOB_CATEGORIES.MEDIS, ...JOB_CATEGORIES.KEPERAWATAN]))} />
                <WidgetCard title="Penunjang Medis" count={getStaffByGroup(JOB_CATEGORIES.PENUNJANG).length} icon={Activity} colorClass="text-purple-500" borderColorClass="border-purple-500" onClick={() => openListModal('Penunjang', getStaffByGroup(JOB_CATEGORIES.PENUNJANG))} />
                <WidgetCard title="Non-Medis" count={getStaffByGroup(JOB_CATEGORIES.NON_MEDIS).length} icon={Briefcase} colorClass="text-orange-500" borderColorClass="border-orange-500" onClick={() => openListModal('Non-Medis', getStaffByGroup(JOB_CATEGORIES.NON_MEDIS))} />
                <WidgetCard title="Dinas Pagi" count={getStaffOnDuty().length} icon={Clock} colorClass="text-blue-500" borderColorClass="border-blue-500" onClick={() => openListModal('Shift Pagi', getStaffOnDuty())} />
            </div>

            {/* Shift Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div onClick={() => openListModal('Shift Pagi', getStaffByShift('Pagi'))} className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-blue-100 transition-all">
                    <div className="p-2 bg-white rounded-full text-blue-500"><Sun size={20}/></div>
                    <div><p className="text-xs text-blue-500 font-bold">SHIFT PAGI</p><p className="text-sm font-bold text-gray-700">07.00 - 15.00</p></div>
                </div>
                 <div onClick={() => openListModal('Shift Sore', getStaffByShift('Sore'))} className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-orange-100 transition-all">
                    <div className="p-2 bg-white rounded-full text-orange-500"><Cloud size={20}/></div>
                    <div><p className="text-xs text-orange-500 font-bold">SHIFT SORE</p><p className="text-sm font-bold text-gray-700">15.00 - 23.00</p></div>
                </div>
                 <div onClick={() => openListModal('Shift Malam', getStaffByShift('Malam'))} className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-indigo-100 transition-all">
                    <div className="p-2 bg-white rounded-full text-indigo-600"><Moon size={20}/></div>
                    <div><p className="text-xs text-indigo-600 font-bold">SHIFT MALAM</p><p className="text-sm font-bold text-gray-700">23.00 - 07.00</p></div>
                </div>
            </div>

            {/* Reuse Modal for lists */}
            <Modal isOpen={modalData.isOpen} onClose={() => setModalData({...modalData, isOpen: false})} title={modalData.title}>
                 {/* Table Rendering logic here (sama seperti sebelumnya) */}
                 <div className="p-4">
                    {modalData.list.map((s, idx) => (
                        <div key={idx} className="border-b py-2">{s.name} - <span className="text-gray-500">{s.unit}</span></div>
                    ))}
                 </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;