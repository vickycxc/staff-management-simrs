import { useState, useEffect } from 'react';
import {
    Search, Filter, ChevronDown, Clock, MoreVertical,
    Eye, Edit, Trash2, User, Briefcase, FileText
} from 'lucide-react';

import Modal from '../components/Modal';
import EditStaffModal from '../components/EditStaffModal';
import { JOB_CATEGORIES } from '../data/jobCategories';

export default function DirectoryPage({ staffData, onDelete, onUpdate }) {
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

    const handleMenuClick = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleEditClick = (staff) => {
        setEditingStaff(staff);
        setIsEditModalOpen(true);
        setOpenMenuId(null);
    };

    const handleSaveEdit = (updatedStaff) => {
        onUpdate(updatedStaff);
        setIsEditModalOpen(false);
        setEditingStaff(null);
        alert('Data berhasil diperbarui!');
    };

    const filteredData = staffData.filter(staff =>
        (filter === 'All' || staff.category === filter) &&
        (
            staff.name.toLowerCase().includes(search.toLowerCase()) ||
            staff.unit.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* ISI JSX LO TETAP, TIDAK PERLU DIUBAH */}
        </div>
    );
}
