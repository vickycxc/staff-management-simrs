// src/pages/DirectoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Clock, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { JOB_CATEGORIES } from '../constants/data';
import Modal from '../components/modal';

const DirectoryPage = ({ staffData, onDelete, onEdit }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleMenuClick = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const filteredData = staffData.filter(staff => {
        const matchCategory = filter === 'All' || staff.category === filter;
        const matchSearch = staff.name.toLowerCase().includes(search.toLowerCase()) || 
                            staff.unit.toLowerCase().includes(search.toLowerCase()) ||
                            staff.employeeId.includes(search);
        return matchCategory && matchSearch;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-end md:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-[#2C2C2C]">Direktori Pegawai</h2>
                </div>
                <div className="flex gap-3">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Cari..." className="pl-10 pr-4 py-2 border rounded-lg" value={search} onChange={(e)=>setSearch(e.target.value)} />
                     </div>
                     <select className="border rounded-lg px-3" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                        <option value="All">Semua</option>
                        {JOB_CATEGORIES.MEDIS.map(c=><option key={c} value={c}>{c}</option>)}
                     </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-visible border border-gray-200">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500">ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500">Nama</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500">Jabatan</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredData.map(staff => (
                            <tr key={staff.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-xs font-mono">{staff.employeeId}</td>
                                <td className="px-6 py-4 font-bold text-gray-700">{staff.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{staff.role}</td>
                                <td className="px-6 py-4 relative">
                                    <button onClick={(e) => handleMenuClick(e, staff.id)}><MoreVertical size={18} className="text-gray-400"/></button>
                                    {openMenuId === staff.id && (
                                        <div className="absolute right-8 top-0 bg-white shadow-xl rounded border z-10 w-32">
                                            <button onClick={()=>setSelectedStaff(staff)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Detail</button>
                                            <button onClick={()=>onDelete(staff.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Hapus</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>

            {/* Detail Modal */}
            <Modal isOpen={!!selectedStaff} onClose={()=>setSelectedStaff(null)} title="Detail Pegawai">
                {selectedStaff && (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold">{selectedStaff.name}</h2>
                        <p>{selectedStaff.unit}</p>
                        {/* Detail lainnya... */}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DirectoryPage;